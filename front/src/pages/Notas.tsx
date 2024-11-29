import { useEffect, useState } from 'react';
import { obtenerNotas } from '../services/notas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDarkMode } from '../interfaces/DarkMode';
import Sidebar from '../components/SideBar';

interface Nota {
  id: number;
  titulo: string;
  texto: string;
  frase: string;
}

const Notas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const cargarNotas = async () => {
      try {
        const data = await obtenerNotas();
        setNotas(data);
      } catch (error) {
        console.error('Error al obtener notas:', error);
      }
    };

    cargarNotas();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-16 p-8">
          <h1 className="text-3xl font-bold mb-6">Mis Notas</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notas.map((nota) => (
              <div key={nota.id} className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-2">{nota.titulo}</h2>
                <p className="text-sm italic mb-4">{nota.frase}</p>
                <p className="text-gray-600 dark:text-gray-300">{nota.texto}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Notas;

