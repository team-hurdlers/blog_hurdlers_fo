// lib/db.js
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// DB 연결 및 테이블 생성
async function openDb() {
  return open({
    filename: './feed_schedule.db',
    driver: sqlite3.Database,
  })
}

// 초기 테이블 생성
async function initDb() {
  const db = await openDb()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scheduled_feeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feed_name TEXT,
      content TEXT,
      image TEXT,
      tags TEXT,
      schedule_time TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  return db
}

export { openDb, initDb }
