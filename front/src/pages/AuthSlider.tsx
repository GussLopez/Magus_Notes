import React, { useState, useEffect } from 'react'
import { Moon, Sun, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Notification from '@/components/Notification'

interface AuthSliderProps {
  initialMode?: 'login' | 'register'
}

export default function AuthSlider({ initialMode = 'login' }: AuthSliderProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/
    return re.test(phone)
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    if (isLogin) {
      if (!validateEmail(email)) {
        showNotification("Por favor, ingrese un correo electrónico válido", "error")
        setIsLoading(false)
        return
      }
      if (!validatePassword(password)) {
        showNotification("La contraseña debe tener al menos 8 caracteres", "error")
        setIsLoading(false)
        return
      }
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          correo: email,
          password
        })
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token)
          showNotification("Inicio de sesión exitoso", "success")
          navigate('/')
        } else {
          showNotification("No se pudo iniciar sesión. Por favor, verifique sus credenciales.", "error")
        }
      } catch (error) {
        console.error('Login error:', error)
        showNotification("Correo o contraseña incorrectos. Por favor, intente de nuevo.", "error")
      }
    } else {
      if (!name || !lastName || !email || !phone || !password) {
        showNotification("Por favor, llene todos los campos", "error")
        setIsLoading(false)
        return
      }
      if (!validateEmail(email)) {
        showNotification("Por favor, ingrese un correo electrónico válido", "error")
        setIsLoading(false)
        return
      }
      if (!validatePassword(password)) {
        showNotification("La contraseña debe tener al menos 8 caracteres", "error")
        setIsLoading(false)
        return
      }
      if (!validatePhone(phone)) {
        showNotification("Por favor, ingrese un número de teléfono válido (10 dígitos)", "error")
        setIsLoading(false)
        return
      }
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          nombre: name,
          apellido: lastName,
          correo: email,
          telefono: phone,
          password
        })

        if (response.status === 201) {
          showNotification("Registro exitoso. Redirigiendo al inicio de sesión...", "success")
          setTimeout(() => {
            setIsLogin(true)
            setEmail('')
            setPassword('')
            setName('')
            setLastName('')
            setPhone('')
          }, 3000)
        } else {
          showNotification("No se pudo completar el registro. Por favor, intente de nuevo.", "error")
        }
      } catch (error) {
        console.error('Registration error:', error)
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            showNotification("Este correo electrónico ya está registrado. Intenta con otro.", "error")
          } else if (error.response?.data?.message) {
            showNotification(error.response.data.message, "error")
          } else {
            showNotification("No se pudo completar el registro. Por favor, intente de nuevo.", "error")
          }
        } else {
          showNotification("Ocurrió un error inesperado. Por favor, intente de nuevo.", "error")
        }
      }
    }

    setIsLoading(false)
  }

  const toggleMode = () => {
    setIsLogin(prev => !prev)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 py-8">
      <div className='w-full max-w-screen-xl mx-auto px-2 flex justify-center'> 
        <div className="w-full min-w-[50vw] max-w-[90vw] h-[650px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex relative mx-auto"> 
          <Button
            variant="outline"
            size="icon"
            className="absolute top-5 right-5 z-10"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="relative w-full h-full flex overflow-hidden">
            <div className="w-full h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${isLogin ? '0%' : '-50%'})` }}>
              <div className="w-1/2 min-w-[50%] p-12 flex flex-col justify-center items-center text-center">
                <img src="/placeholder.svg?height=100&width=100" alt="Magus Notes Logo" className="mb-4 w-24 h-24" />
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Magus Notes</h2>
                <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Iniciar Sesión</h3>
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                  <div>
                    <Label htmlFor="login-email" className="text-left block mb-1">Correo Electrónico</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="login-password" className="text-left block mb-1">Contraseña</Label>
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Cargando...
                      </div>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>
                </form>
                <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                  <a href="/reset-password" className="hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
              </div>

              <div className="w-1/2 min-w-[50%] p-12 flex flex-col justify-center items-center text-center">
                <img src="/placeholder.svg?height=100&width=100" alt="Magus Notes Logo" className="mb-4 w-24 h-24" />
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Magus Notes</h2>
                <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Registrarse</h3>
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                  <div>
                    <Label htmlFor="register-name" className="text-left block mb-1">Nombre</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-lastname" className="text-left block mb-1">Apellido</Label>
                    <Input
                      id="register-lastname"
                      type="text"
                      placeholder="Tu apellido"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-email" className="text-left block mb-1">Correo Electrónico</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-phone" className="text-left block mb-1">Teléfono</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="Tu número de teléfono"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="register-password" className="text-left block mb-1">Contraseña</Label>
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Cargando...
                      </div>
                    ) : (
                      'Registrarse'
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div 
              className={`absolute top-0 bottom-0 w-1/2 bg-cyan-500 text-white p-12 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${
                isLogin ? 'right-0' : 'translate-x-full'
              }`}
            >
              <img src="/placeholder.svg?height=200&width=200" alt="Decorative" className="mb-8 w-48 h-48" />
              <h2 className="text-3xl font-bold mb-6 text-center">
                {isLogin ? '¿Eres nuevo aquí?' : '¿Ya tienes una cuenta?'}
              </h2>
              <p className="text-lg mb-8 text-center">
                {isLogin ? 'Regístrate y comienza tu viaje con nosotros' : 'Inicia sesión para continuar tu experiencia'}
              </p>
              <Button
                onClick={toggleMode}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-500 font-bold py-2 px-4 rounded-md transition duration-300"
              >
                {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
              </Button>
            </div>
          </div>
        </div>
      </div>
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
