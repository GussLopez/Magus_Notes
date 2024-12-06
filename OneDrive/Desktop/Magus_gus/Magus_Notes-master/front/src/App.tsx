import { Route, Routes } from 'react-router-dom'
import './App.css'
import { DarkModeProvider } from './interfaces/DarkMode'
import Home from './pages/Home'
import Notas from './pages/Notas'
import Perfil from './pages/Perfil'
import CrearNota from './pages/CrearNota'
import EditarNota from './pages/EditarNota'
import Soporte from './pages/Soporte'
import AuthSlider from "./pages/AuthSlider";
import PasswordReset from "./pages/PasswordReset";
function App() {
  


  return (
    <>
   <DarkModeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<AuthSlider />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/sobre-nosotros" element={<Soporte />} />
        <Route path="/crearNota" element={<CrearNota />} />
        <Route path={`/notas/editarNota/:id`} element={<EditarNota />} />
        <Route path="/register" element={<AuthSlider initialMode="register" />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </DarkModeProvider>
      
    </>
  )
}

export default App
