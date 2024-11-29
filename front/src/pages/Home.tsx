import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Footer from "../components/Footer"
import Header from "../components/Header"
import Quotes from "../components/Quotes"
import SearchBar from "../components/SearchBar"
import { Button } from "@/components/ui/button"
import Notification from '@/components/Notification'
import jwtDecode from 'jwt-decode'
import { useDarkMode } from '@/interfaces/DarkMode'

function Home() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [bottomSearchTerm, setBottomSearchTerm] = useState('')
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { name?: string; email?: string }
        setUser(decodedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        localStorage.removeItem('token')
        setUser(null)
      }
    }
  }, [])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    showNotification("Sesión cerrada exitosamente", "success")
  }

  const handleCreateNotes = () => {
    if (user) {
      navigate('/notes')
    } else {
      navigate('/login')
    }
  }

  const handleBottomSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottomSearchTerm(e.target.value)
    // Aquí puedes agregar la lógica de búsqueda en tiempo real si es necesario
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      
      <main className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="max-w-screen-lg mx-auto px-2 py-16 flex flex-col justify-center items-center gap-8 box-border">
            <div className="flex items-center justify-center mb-8">
              <svg className="w-24 h-24 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className="text-7xl font-bold text-center motion-preset-flomoji-🚀">Magus Notes</h1>
            <p className="text-2xl font-light text-center">"Toma notas, crea ideas y nunca dejes de aprender."</p>
            {user && (
              <p className="text-xl">Bienvenido, {user.name || user.email}!</p>
            )}
            <Button onClick={handleCreateNotes} className="px-3 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition-colors motion-preset-shake">
              {user ? 'Crear Notas' : 'Iniciar Sesión para Crear Notas'}
            </Button>
            {user ? (
              <Button onClick={handleLogout} className="mt-4">Cerrar Sesión</Button>
            ) : (
              <Button onClick={() => navigate('/login')} className="mt-4">Iniciar Sesión</Button>
            )}
          </div>

          <SearchBar onSearch={handleBottomSearch} searchTerm={bottomSearchTerm} />
          <Quotes/>
        </div>
        <div className="py-16"></div>
      </main>

      <Footer />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

export default Home

