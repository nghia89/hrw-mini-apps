import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TokenProvider, useToken } from './context/TokenContext'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import HomePage from './pages/HomePage'
import FeedbackPage from './pages/FeedbackPage'
import ThankYouPage from './pages/ThankYouPage'

const AppContent = () => {
  const { isLoading } = useToken()

  // Show loading screen while waiting for token authentication
  if (isLoading) {
    return (
      <LoadingSpinner
        text="🔐 Đang xác thực..."
        subtext="Đang kết nối với ứng dụng chính"
        fullScreen={true}
        size="60px"
        showProgress={true}
        showDots={true}
      />
    )
  }

  return (
    <Router basename="/feedback-mini-app">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

function App() {
  return (
    <TokenProvider>
      <AppContent />
    </TokenProvider>
  )
}

export default App
