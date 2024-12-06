import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"


function Perfil() {

    const [data, setData] = useState('')

    return (
    <>
    <Header />
        <div className="max-w-screen-lg mx-auto px-2 h-screen">
            <h1 className="font-semibold text-3xl">Perfil</h1>
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