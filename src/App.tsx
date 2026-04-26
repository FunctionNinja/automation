
import { useState, useEffect } from 'react'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'


function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false)
 
 useEffect(() => {
  // Check authentication status
  // For now, we'll just set it to true
  setIsAuthenticated(false)
 }, [])
 
 return isAuthenticated ? (
  <Dashboard />
 ) : (
  <Auth />
 )
 
}

export default App
