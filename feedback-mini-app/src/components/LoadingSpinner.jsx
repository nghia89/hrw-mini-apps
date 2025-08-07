import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.$fullScreen ? '100vh' : '200px'};
  padding: 2rem;
  text-align: center;
  background: ${props => props.$fullScreen ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'transparent'
  };
  color: white;
`

const Spinner = styled.div`
  width: ${props => props.$size || '40px'};
  height: ${props => props.$size || '40px'};
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`

const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  animation: ${fadeInUp} 0.6s ease-out;
`

const LoadingSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
`

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 1rem;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;
`

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation: ${pulse} 1.4s ease-in-out infinite both;
  animation-delay: ${props => props.$delay || '0s'};
`

const ProgressBar = styled.div`
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 1.5rem auto 0;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      white 50%, 
      transparent 100%
    );
    animation: slide 2s ease-in-out infinite;
  }

  @keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`

const LoadingSpinner = ({ 
  text = "Đang tải...", 
  subtext = "",
  fullScreen = false,
  size = "40px",
  showProgress = false,
  showDots = true 
}) => {
  return (
    <LoadingContainer $fullScreen={fullScreen}>
      <Spinner $size={size} />
      
      {text && <LoadingText>{text}</LoadingText>}
      {subtext && <LoadingSubtext>{subtext}</LoadingSubtext>}
      
      {showProgress && <ProgressBar />}
      
      {showDots && (
        <LoadingDots>
          <Dot $delay="-0.32s" />
          <Dot $delay="-0.16s" />
          <Dot $delay="0s" />
        </LoadingDots>
      )}
    </LoadingContainer>
  )
}

export default LoadingSpinner
