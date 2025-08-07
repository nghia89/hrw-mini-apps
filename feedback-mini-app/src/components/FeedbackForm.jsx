import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../context/TokenContext'
import LoadingSpinner from './LoadingSpinner'

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 0.5rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 0 0.25rem;
    border-radius: 12px;
  }
`

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: #666;
  }

  @media (max-width: 768px) {
    min-height: 100px;
    padding: 0.8rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-height: 80px;
    padding: 0.75rem;
    font-size: 0.9rem;
    border-radius: 8px;
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #666;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.2rem;
    font-size: 0.95rem;
    border-radius: 8px;
    width: 100%;
  }
`

const Warning = styled.div`
  background: rgba(255, 193, 7, 0.2);
  border: 1px solid rgba(255, 193, 7, 0.5);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.9rem;
    border-radius: 8px;
    line-height: 1.4;
  }
`

const InlineSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
    margin-right: 0.4rem;
  }
`

const CharCount = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: right;
  margin-top: -0.5rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    text-align: center;
    margin-top: -0.3rem;
  }
`

const FeedbackForm = () => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { token, hasToken, isLoading } = useToken()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!hasToken) {
      setError('Vui lòng đợi xác thực từ ứng dụng chính')
      return
    }

    if (!content.trim()) {
      setError('Vui lòng nhập nội dung góp ý')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://api.example.com/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: content.trim()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Feedback sent successfully:', result)
      
      // Chuyển đến trang thank you
      navigate('/thank-you')
      
    } catch (error) {
      console.error('❌ Error sending feedback:', error)
      
      // Hiển thị lỗi thân thiện với người dùng
      if (error.message.includes('Failed to fetch')) {
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.')
      } else if (error.message.includes('401')) {
        setError('Token không hợp lệ. Vui lòng đăng nhập lại.')
      } else if (error.message.includes('403')) {
        setError('Bạn không có quyền thực hiện thao tác này.')
      } else {
        setError('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxLength = 1000
  const remaining = maxLength - content.length

  return (
    <FormContainer>
      <Title>📝 Gửi góp ý của bạn</Title>
      
      {!hasToken && !isLoading && (
        <Warning>
          ⚠️ Chưa nhận được token xác thực. Vui lòng đảm bảo ứng dụng được mở từ app chính.
        </Warning>
      )}

      {isLoading && (
        <Warning>
          🔄 Đang chờ xác thực từ ứng dụng chính...
        </Warning>
      )}

      <Form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung góp ý của bạn tại đây..."
          maxLength={maxLength}
          disabled={isSubmitting || !hasToken}
        />
        
        <CharCount>
          {content.length}/{maxLength} ký tự
          {remaining < 100 && ` (còn ${remaining})`}
        </CharCount>

        {error && (
          <Warning style={{ background: 'rgba(220, 53, 69, 0.2)', borderColor: 'rgba(220, 53, 69, 0.5)' }}>
            ❌ {error}
          </Warning>
        )}

        <SubmitButton 
          type="submit" 
          disabled={isSubmitting || !hasToken || !content.trim()}
        >
          {isSubmitting && <InlineSpinner />}
          {isSubmitting ? 'Đang gửi...' : 'Gửi góp ý'}
        </SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default FeedbackForm
