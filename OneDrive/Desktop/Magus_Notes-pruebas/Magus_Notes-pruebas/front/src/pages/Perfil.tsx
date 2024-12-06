import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"


function Perfil() {

    const [data, setData] = useState('')

    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días ☀️';
        if (hora < 18) return 'Buenas tardes 🌤️';
        return 'Buenas noches 🌙';
      };
      
     
      

    return (
    <>
    <Header />
        <div className="max-w-screen-lg mx-auto px-2 h-screen">
        <h1 className="text-4xl font-bold mb-10 text-center">{getSaludo()}, Gustavo</h1>
            <input type="text" id="input" onChange={(e) => setData(e.target.value)}/>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`} alt="" />
            <button 
            id="generar-qr"
            >
                generar QR
            </button>
        </div>
    <Footer />
    </>  
    )  
}

export default Perfil