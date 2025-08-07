import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
  }
`

const SuccessCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }
`

const SuccessIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
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

const Message = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1rem;
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
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.95rem;
    border-radius: 8px;
    width: 200px;
    text-align: center;
  }
`

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-top: 1.5rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
  }
`

const InfoTitle = styled.h3`
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
  }
`

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`

const ThankYouPage = () => {
  return (
    <Container>
      <SuccessCard>
        <SuccessIcon>🎉</SuccessIcon>
        
        <Title>Cảm ơn bạn!</Title>
        
        <Message>
          Góp ý của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và phản hồi 
          trong thời gian sớm nhất. Ý kiến của bạn rất quan trọng để chúng tôi 
          cải thiện dịch vụ.
        </Message>

        <ButtonContainer>
          <ActionButton to="/feedback">
            📝 Gửi góp ý khác
          </ActionButton>
          
          <SecondaryButton to="/">
            🏠 Về trang chủ
          </SecondaryButton>
        </ButtonContainer>

        <InfoBox>
          <InfoTitle>📧 Thông tin liên hệ</InfoTitle>
          <InfoText>
            Nếu có thắc mắc gấp, bạn có thể liên hệ trực tiếp qua email: 
            <br />
            <strong>support@hrw-company.com</strong>
          </InfoText>
        </InfoBox>
      </SuccessCard>
    </Container>
  )
}

export default ThankYouPage
