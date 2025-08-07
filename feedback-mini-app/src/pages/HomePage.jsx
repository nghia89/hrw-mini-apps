import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useToken } from '../context/TokenContext'

const Container = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
  }
`

const Hero = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }
`

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: 480px) {
    margin-top: 1.5rem;
    gap: 0.8rem;
  }
`

const ActionButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: inline-block;
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 10px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
`

const FeatureDesc = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`

const StatusCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`

const StatusTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
    flex-wrap: wrap;
  }
`

const StatusText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`

const HomePage = () => {
  const { token, hasToken, isLoading } = useToken()

  const getStatusMessage = () => {
    if (isLoading) {
      return {
        icon: '🔄',
        title: 'Đang kết nối...',
        message: 'Hệ thống đang xác thực với ứng dụng chính. Vui lòng đợi trong giây lát.'
      }
    }
    
    if (hasToken) {
      return {
        icon: '✅',
        title: 'Kết nối thành công',
        message: 'Bạn đã được xác thực và có thể sử dụng đầy đủ các tính năng của Mini App.'
      }
    }
    
    return {
      icon: '⚠️',
      title: 'Chờ xác thực',
      message: 'Mini App đang chờ token xác thực từ ứng dụng chính. Đảm bảo bạn mở Mini App từ ứng dụng gốc.'
    }
  }

  const status = getStatusMessage()

  return (
    <Container>
      <Hero>
        <Title>🏠 Mini App - Trang chủ</Title>
        <Subtitle>
          Chào mừng bạn đến với hệ thống thu thập góp ý. 
          Chúng tôi luôn lắng nghe ý kiến của bạn để cải thiện dịch vụ.
        </Subtitle>

        <ButtonContainer>
          <ActionButton to="/feedback">
            📝 Gửi góp ý ngay
          </ActionButton>
        </ButtonContainer>
      </Hero>

      <StatusCard>
        <StatusTitle>
          {status.icon} {status.title}
        </StatusTitle>
        <StatusText>{status.message}</StatusText>
      </StatusCard>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>📱</FeatureIcon>
          <FeatureTitle>Tích hợp Native App</FeatureTitle>
          <FeatureDesc>
            Hoạt động mượt mà với ứng dụng chính thông qua token authentication
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔒</FeatureIcon>
          <FeatureTitle>Bảo mật cao</FeatureTitle>
          <FeatureDesc>
            Sử dụng Bearer token để đảm bảo chỉ người dùng được xác thực mới có thể gửi góp ý
          </FeatureDesc>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Nhanh chóng</FeatureTitle>
          <FeatureDesc>
            Giao diện tối ưu, phản hồi nhanh và trải nghiệm người dùng mượt mà
          </FeatureDesc>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  )
}

export default HomePage
