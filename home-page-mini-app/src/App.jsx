import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`

const Title = styled.h1`
  color: #667eea;
  margin-bottom: 20px;
  font-size: 2.5rem;
`

const Description = styled.p`
  color: #666;
  font-size: 1.2rem;
  line-height: 1.6;
`

const HomePage = () => {
  return (
    <Container>
      <Card>
        <Title>🏠 Home Page Mini App</Title>
        <Description>
          Chào mừng bạn đến với Home Page Mini App! 
          Đây là ứng dụng demo cho hệ thống Multi Mini Apps.
        </Description>
      </Card>
    </Container>
  )
}

const App = () => {
  return (
    <Router basename="/home-page-mini-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
