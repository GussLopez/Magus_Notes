import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useDarkMode } from "@/interfaces/DarkMode"


function Perfil() {

    const [data, setData] = useState('')
    const [activeTab, setActiveTab] = useState('QR')
    const { isDarkMode } = useDarkMode()
    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días ☀️';
        if (hora < 18) return 'Buenas tardes 🌤️';
        return 'Buenas noches 🌙';
      };
      
      <h1 className="text-4xl font-bold mb-10 text-center">{getSaludo()}, Gustavo</h1>
      

    return (
    <>
    <Header />
    <div className={`min-h-screen dark:bg-gray-900 bg-gray-100 p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`dark:bg-gray-800 bg-white rounded-lg shadow-md p-6`}>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full mb-4"></div>
              <h2 className={`text-2xl font-semibold dark:text-white text-gray-800}`}>Seth Hallam</h2>
              <span className={`text-sm dark:text-gray-400 text-gray-500}`}>Subscriber</span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
              <div>
                <p className="text-2xl font-bold">1.23k</p>
                <p className={`text-sm dark:text-gray-400 text-gray-500}`}>Task Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold">568</p>
                <p className={`text-sm dark:text-gray-400' : 'text-gray-500'}`}>Project Done</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p><strong>Username:</strong> @shallamb</p>
              <p><strong>Billing Email:</strong> shallamb@gmail.com</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Role:</strong> Subscriber</p>
              <p><strong>Tax ID:</strong> Tax-8894</p>
              <p><strong>Contact:</strong> +1 (234) 464-0600</p>
              <p><strong>Language:</strong> English</p>
              <p><strong>Country:</strong> France</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-red text-red-600 border border-red-500 rounded-lg hover:bg-red-200 transition-colors">
                Suspend
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3 space-y-8">
            {/* Tabs */}
            <div className={`dark:bg-gray-800 bg-white rounded-lg shadow-md`}>
              <div className="flex items-center justify-between p-4 border-b">
                <nav className="flex space-x-4">
                  {['QR', 'Favoritos', 'Destacadas', 'Borrador'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === tab
                          ? isDarkMode
                            ? 'bg-cyan-500 text-white-100'
                            : 'bg-cyan-200 text-white-500'
                          : isDarkMode
                          ? 'text-gray-400 hover:text-cyan-200'
                          : 'text-gray-500 hover:text-cyan-500'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
                <input
                  type="text"
                  placeholder="Search Project"
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  }`}
                />
              </div>
              <div className="p-6">
                {activeTab === 'QR' && (
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Codigo QR</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Escanea tu codigo</p>
                  </div>
                )}
                {activeTab === 'Favoritos' && (
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Favoritos</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Aqui apareceran tus notas favoritas </p>
                  </div>
                )}
                {activeTab === 'Destacadas' && (
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Destacadas</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Aqui apareceran tus notas Destacadas</p>
                  </div>
                )}
                {activeTab === 'Borrador' && (
                  <div>
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Borrador</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Deseas recuperar tus notas?</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Perfil