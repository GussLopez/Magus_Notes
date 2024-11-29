import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import Exclude from "../assets/exclude.svg"
import { useDarkMode } from "../interfaces/DarkMode"

function Footer() {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            <footer className={`${isDarkMode ? 'bg-gray-900 border-t-2 border-t-gray-800' : 'bg-gray-50 border-t-gray-100 border-t-2'} py-10 mt-16 box-border px-2`}>
                <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row md:justify-between mb-10 gap-10 md:gap-5 ">

                    <div className="flex flex-col items-center md:items-start md:flex-row gap-3 mb-6">
                        <a href="/"><img src={Exclude} alt="Exclude logo" className="w-10 md:w-8 pt-1" /></a>
                        <div className="flex flex-col gap-5 md:gap-1">
                            <p className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700'} text-3xl font-bold`}>
                                <a href="/" >
                                    <h3 className="text-center md:text-start mb-3">Magus Notes</h3>
                                </a>
                            </p>
                            <p className="text-center md:text-start">Potenciando tus ideas, una nota a la vez</p>
                        </div>
                    </div>

                        <div className="">
                            <h3 className="text-center text-lg font-semibold md:text-start mb-5">Enlaces Rápidos</h3>
                            <nav className="flex flex-col items-center md:items-start gap-1">
                                
                                <a href="/" className="md:block hover:text-cyan-500 transition-colors">Home</a>
                                <a href="/perfil" className="md:block hover:text-cyan-500 transition-colors">Perfil</a>
                                <a href="/" className="md:block hover:text-cyan-500 transition-colors">Soporte</a>
                                <a href="/" className="md:block hover:text-cyan-500 transition-colors">Sobre Nosotros</a>
                            </nav>
                        </div>
                        <div className="">
                            <h3 className="text-center text-lg font-semibold md:text-start mb-5">Contáctanos</h3>
                            <div className="flex flex-col items-center md:block gap-3">
                                
                            <p><span className="font-semibold">Correo:</span> info@magusnotes.com</p>
                            <p className="my-2"><span className="font-semibold">Teléfono:</span> info@magusnotes.com</p>
                            <p><span className="font-semibold">Dirección:</span> 124 Chiringuito Chatarra, 77500</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-center text-lg font-semibold md:text-start mb-5">Síguenos</h3>
                            <div className="flex gap-3 mt-6 md:mt-0 justify-center">
                                <a href="https://instagram.com">
                                    <InstagramLogo size={26} className="hover:text-cyan-500"/>
                                </a>
                                <a href="https://facebook.com">
                                    <FacebookLogo size={26} className="hover:text-cyan-500"/>
                                </a>
                                <a href="https://instagram.com">
                                    <LinkedinLogo size={26} className="hover:text-cyan-500" />
                                </a>
                                <a href="https://facebook.com">
                                    <XLogo size={26} className="hover:text-cyan-500" />
                                </a>
                            </div>
                        </div>
                    
                </div>
                <div className="mx-auto max-w-screen-xl my-5">
                    <hr />
                    <p className="my-5 text-center text-md text-gray-400">© 2024 Magus Notes. Todos los derechos reservados</p>
                </div>
                
            </footer>
        </>
    )
}

export default Footer