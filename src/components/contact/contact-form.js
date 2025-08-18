'use client'

import { useState } from 'react'
import { useAlert } from '@/context/AlertContext'
import { ArrowRight } from 'lucide-react'

export default function ContactForm() {
  const { showAlert } = useAlert()
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate required fields
    const requiredFields = {
      name: '성함',
      email: '이메일',
      company: '회사명',
      message: '문의 내용',
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]?.trim()) {
        showAlert(`${label}을(를) 입력해주세요!`)
        return
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      showAlert('올바른 이메일 형식을 입력해주세요!')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/slack/inquiry/ai-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          idea: formData.message.trim(),
          contactInfo: {
            name: formData.name.trim(),
            position: formData.position.trim(),
            company: formData.company.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || '서버 오류가 발생했습니다.')
      }

      showAlert('문의가 성공적으로 접수되었습니다!')

      // Reset form
      setFormData({
        name: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('Form submission error:', error)
      showAlert(
        error.message ||
          '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle =
    'w-full px-3 py-2 bg-[#F2F2F2] border border-gray-600 rounded-md focus:outline-none focus:border-black focus:border-2 focus:ring-0 transition-colors placeholder-gray-500 md:px-4 md:py-3'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="성함"
            className={inputStyle}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="직함"
            className={inputStyle}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="회사명"
            className={inputStyle}
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="전화번호"
            className={inputStyle}
          />
        </div>
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일 주소"
          className={inputStyle}
          required
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="문의 내용"
          rows="6"
          className={inputStyle}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 md:py-3 flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors rounded-xl shadow-2xl"
      >
        <span>Apply</span>
        <span className="text-lg">→</span>
      </button>
    </form>
  )
}
