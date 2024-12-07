import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer"
import Header from "../components/Header"
import Quotes from "../components/Quotes"
import SearchBar from "../components/SearchBar"

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/login')
    }

    return (
        <>
            <Header />

            <main>
                <div className="max-w-screen-lg mx-auto px-2 h-[530px] flex flex-col justify-center items-center gap-8 box-border">
                    <h1 className="text-7xl font-bold text-center motion-preset-flomoji-🚀 ">Magus Notes</h1>
                    <p className="text-2xl font-light text-center">"Toma notas, crea ideas, y nunca dejes de aprender."</p>
                    <div className="flex gap-4">
                        <a href="/crearNota" className="px-3 py-2 bg-cyan-500 rounded-lg font-semibold text-white hover:bg-cyan-600 transition-colors motion-preset-shake">Crear Notas</a>
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="px-3 py-2 bg-red-500 rounded-lg font-semibold text-white hover:bg-red-600 transition-colors motion-preset-shake"
                            >
                                Cerrar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </main>
            <SearchBar />
            
            <Quotes />
            <Footer />
        </>
    )
}

export default Home

