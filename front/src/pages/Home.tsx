import Footer from "../components/Footer"
import Header from "../components/Header"
import Quotes from "../components/Quotes"
import SearchBar from "../components/SearchBar"

function Home() {

    return (
        <>
            <Header />

            <main>
                <div className="max-w-screen-lg mx-auto px-2 h-[530px] flex flex-col justify-center items-center gap-8 box-border">
                    <h1 className="text-7xl font-bold text-center motion-preset-flomoji-🚀 ">Magus Notes</h1>
                    <p className="text-2xl font-light text-center">"Toma notas, crea ideas, y nunca dejes de aprender."</p>
                    <a href="/crearNota" className="px-3 py-2 bg-cyan-500 rounded-lg font-semibold text-white hover:bg-cyan-600 transition-colors motion-preset-shake">Crear Notas</a>

                </div>
            </main>
            <SearchBar />
            <div className="custom-shape-divider-top-1733114191">
            <svg  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" ><path  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill text-gray-200 dark:text-gray-800" fill="currentColor" fill-opacity="1"></path></svg>
            </div>
            <Quotes />
            <Footer />
        </>
    )
}

export default Home