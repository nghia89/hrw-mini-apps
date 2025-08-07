import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useToken } from '../context/TokenContext'

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const Header = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
`

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
  }
`

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    text-align: center;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    justify-content: center;
    width: 100%;
  }
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    flex: 1;
    text-align: center;
    min-width: 100px;
  }
`

const TokenStatus = styled.div`
  color: white;
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  background: ${props => props.$hasToken ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 0, 0.2)'};
  border: 1px solid ${props => props.$hasToken ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)'};
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
  }
`

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
`

const Layout = ({ children }) => {
  const location = useLocation()
  const { token, hasToken, isLoading } = useToken()

  const getTokenStatusText = () => {
    if (isLoading) return '🔄 Đang tải...'
    if (hasToken) return '✅ Đã xác thực'
    return '⚠️ Chưa có token'
  }

  return (
    <LayoutWrapper>
      <Header>
        <Nav>
          <Logo>📱 Mini App</Logo>
          
          <NavLinks>
            <NavLink to="/" $isActive={location.pathname === '/'}>
              🏠 Trang chủ
            </NavLink>
            <NavLink to="/feedback" $isActive={location.pathname === '/feedback'}>
              📝 Feedback
            </NavLink>
            
            <TokenStatus $hasToken={hasToken}>
              {getTokenStatusText()}
            </TokenStatus>
          </NavLinks>
        </Nav>
      </Header>

      <Main>
        {children}
      </Main>

      <Footer>
        <p>© 2025 HRW Mini App - Feedback System</p>
      </Footer>
    </LayoutWrapper>
  )
}

export default Layout
