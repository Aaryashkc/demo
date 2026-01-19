import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Header } from './components/Headers/Header'
import { Footer } from './components/Headers/Footer'

const App = () => {
  return (
    <div>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />

    </div>

  )
}

export default App