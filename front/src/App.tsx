import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DarkModeProvider } from './interfaces/DarkMode'
import Home from './pages/Home'
import Notas from './pages/Notas'
import Perfil from './pages/Perfil'
import CrearNota from './pages/CrearNota'
import EditarNota from './pages/EditarNota'
import Iniciosesion from './pages/Login'
import Soporte from './pages/Soporte'
import Nota from './pages/Nota'

function App() {
  


  return (
    <>
   <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Iniciosesion initialMode="register"/>} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/sobre-nosotros" element={<Soporte />} />
        <Route path="/crearNota" element={<CrearNota />} />
        <Route path={`/notas/editarNota/:id`} element={<EditarNota />} />
        <Route path={`/notas/nota/:id`} element={<Nota />} />
      </Routes>
    </DarkModeProvider>
      
    </>
  )
}

export default App
