import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import './pages/Auth.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Team from './pages/Team'

// ── Theme hook ─────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pitstop-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pitstop-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}

// Helper component to scroll to top on route change or jump to hash if present
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function AppShell() {
  const [search, setSearch] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const { theme, toggleTheme } = useTheme()

  const handleAddToCart = () => {
    setCartCount((count) => count + 1)
  }

  const handleCartClick = () => {
    alert(`Pitstop Garage Cart: ${cartCount} items selected. Paddock checkout opening soon!`)
  }

  return (
    <div className="site-shell">
      <ScrollToTop />
      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        onCartClick={handleCartClick}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/team" element={<Team />} />
        <Route
          path="*"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              onAddToCart={handleAddToCart}
            />
          }
        />
      </Routes>
      <Footer theme={theme} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
