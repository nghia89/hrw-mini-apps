import React, { createContext, useContext, useState, useEffect } from 'react'

const TokenContext = createContext()

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Lắng nghe message từ Native App
    const handleMessage = (event) => {
      // Trong production, nên kiểm tra origin để bảo mật
      // if (event.origin !== 'https://your-native-app-domain.com') return
      
      console.log('📱 Received message from Native App:', event.data)
      
      if (event.data.type === 'AUTH_TOKEN') {
        setToken(event.data.token)
        setIsLoading(false)
        console.log('✅ Token received and saved')
      }
    }

    // Đăng ký listener
    window.addEventListener('message', handleMessage, false)

    // Gửi message để yêu cầu token từ Native App
    const requestToken = () => {
      if (window.parent !== window) {
        console.log('📤 Requesting token from Native App...')
        window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*')
      } else {
        // Development mode - simulate token sau 2 giây
        console.log('🔧 Development mode - simulating token...')
        setTimeout(() => {
          setToken('dev_token_123456789')
          setIsLoading(false)
          console.log('✅ Development token set')
        }, 2000)
      }
    }

    // Yêu cầu token khi component mount
    requestToken()

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage, false)
    }
  }, [])

  const clearToken = () => {
    setToken(null)
    console.log('🗑️ Token cleared')
  }

  const value = {
    token,
    isLoading,
    setToken,
    clearToken,
    hasToken: !!token
  }

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  )
}
