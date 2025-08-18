// vector-store.js - 문서 검색 전용 모듈
import OpenAI from 'openai'
import supabaseClient from './supabase-client'

// 환경 변수 설정
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// 임베딩 생성 함수
async function createEmbedding(text) {
  try {
    console.log('임베딩 생성 시작:', text.substring(0, 50) + '...')

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })

    console.log('임베딩 생성 완료, 차원:', response.data[0].embedding.length)
    return response.data[0].embedding
  } catch (error) {
    console.error('임베딩 생성 오류:', error.message)
    throw error
  }
}

// 유사 문서 검색 함수
export async function searchSimilarDocuments(query, k = 12, verbose = false) {
  try {
    if (verbose) console.log('검색 쿼리:', query)

    // 쿼리 텍스트를 임베딩 벡터로 변환
    const queryEmbedding = await createEmbedding(query)

    // 방법 1: RPC 함수 호출
    if (verbose) console.log('RPC 함수로 문서 검색 시도...')

    const { data: rpcData, error: rpcError } = await supabaseClient.rpc(
      'match_documents',
      {
        query_embedding: queryEmbedding,
        match_count: k,
        filter: {},
      },
    )

    if (rpcError) {
      console.error('RPC 함수 호출 오류:', rpcError.message)
      // RPC 오류 발생 시 방법 2로 진행
    } else if (rpcData && rpcData.length > 0) {
      if (verbose) {
        console.log('RPC 함수 호출 성공, 결과 수:', rpcData.length)
        console.log('첫 번째 결과 유사도:', rpcData[0].similarity)
      }

      // 결과 형식 변환 및 유사도 기준 정렬
      return rpcData
        .map((item) => ({
          pageContent: item.content,
          metadata: item.metadata || {},
          similarity: item.similarity,
        }))
        .sort((a, b) => b.similarity - a.similarity)
    }

    // 방법 2: 직접 SQL 쿼리 실행
    if (verbose) console.log('직접 SQL 쿼리로 문서 검색 시도...')

    const { data: sqlData, error: sqlError } = await supabaseClient
      .from('documents')
      .select('id, content, metadata')
      .order(`embedding <-> '[${queryEmbedding.join(',')}]'::vector`)
      .limit(k)

    if (sqlError) {
      console.error('SQL 쿼리 실행 오류:', sqlError.message)
      return []
    } else if (sqlData && sqlData.length > 0) {
      if (verbose) console.log('SQL 쿼리 실행 성공, 결과 수:', sqlData.length)

      // 결과 형식 변환
      return sqlData.map((doc) => ({
        pageContent: doc.content,
        metadata: doc.metadata || {},
      }))
    }

    // 검색 결과가 없는 경우 빈 배열 반환
    return []
  } catch (error) {
    console.error('문서 검색 중 오류 발생:', error.message)
    console.error('오류 스택:', error.stack)
    return []
  }
}

// 모든 제품 정보 가져오기 함수
export async function getAllProducts(limit = 10) {
  try {
    console.log('제품 목록 조회 시작...')

    const { data, error } = await supabaseClient
      .from('documents')
      .select('id, content, metadata')
      .eq('metadata->>type', 'product_basic')
      .limit(limit)

    if (error) {
      console.error('제품 목록 조회 오류:', error.message)
      return []
    }

    console.log(`제품 목록 조회 완료, ${data.length}개 제품 조회됨`)

    return data.map((doc) => ({
      pageContent: doc.content,
      metadata: doc.metadata || {},
    }))
  } catch (error) {
    console.error('제품 목록 조회 오류:', error.message)
    return []
  }
}
