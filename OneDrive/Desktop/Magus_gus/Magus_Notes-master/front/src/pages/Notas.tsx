import { useEffect, useState } from 'react';
import { eliminarNota, obtenerNotas } from '../services/notas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDarkMode } from "../interfaces/DarkMode";
import DropDown from '../components/DropDown';
import Modal from '../components/Modal';
import { MagnifyingGlass, NotePencil, Plus, Trash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const Notas = () => {
  const { isDarkMode } = useDarkMode();
  const [notas, setNotas] = useState<{ id: number; titulo: string; texto: string; frase: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null)
  const [filtrar, setFiltrar] = useState([]);
  const [buscador, setBuscador] = useState<string>('')

  useEffect(() => {
    const cargarNotas = async () => {
      try {
        const data = await obtenerNotas();
        setNotas(data);
        setFiltrar(data);
      } catch (error) {
        console.error('Error al obtener notas:', error)
      }
    };

    cargarNotas();
  }, []);

  useEffect(() => {
    if (buscador.trim() === '') {
      setFiltrar(notas)
    } else {
      const lowerCase = buscador.toLowerCase();
      setFiltrar(
        notas.filter(item => item.titulo?.toLowerCase().includes(lowerCase))
      )
    }
  }, [buscador, notas]);

  const manejarEliminar = async () => {
    if (!notaSeleccionada) return;

    try {
      await eliminarNota(notaSeleccionada.id);
      setNotas(notas.filter(nota => nota.id !== notaSeleccionada.id));
      setFiltrar(filtrar.filter(nota => nota.id !== notaSeleccionada.id))
      setOpen(false)
      setNotaSeleccionada(null)
    } catch (error) {
      console.error('Error al eliminar la nota', error);
    }
  }

  return (
    <>
      <Header />

      <div className='max-w-screen-lg mx-auto px-2 mb-60 h-screen'>
        <div className={`md:flex md:justify-between box-border px-5 py-3 my-10 rounded-md md:items-center`}>
          <h1 className="text-4xl font-bold mb-10 text-center md:mb-0 md:text-start">Mis Notas 🗒️</h1>

          <div className="relative flex">
            <input
              type="search"
              id="search-notas"
              className={`block w-full h-[40px] sm:h-[45px] rounded-md shadow-md outline-none pl-12 pr-4 text-sm sm:text-base ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                } focus:ring-2 focus:ring-cyan-500`}
              placeholder="Buscar Nota"
              onChange={(e) => setBuscador(e.target.value)}
            />
            <MagnifyingGlass size={32} className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500`} />
          </div>
        </div>
        {filtrar.length === 0 ? (
          <div className="text-center mt-20">
            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              No hay notas disponibles. ¡Crea tu primera nota ahora! 📒
            </p>
            <Link
              to="/crearNota"
              className="mt-5 inline-block px-4 py-2 bg-cyan-500 text-white rounded-md font-semibold hover:bg-cyan-600 transition-colors"
            >
              Crear Nota
            </Link>
          </div>
        ) : (
          <ul>
            {filtrar.map((nota) => (
              <li className='mb-10' key={nota.id}>
                <div className={`p-5 shadow rounded-md box-border my-8 md:my-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-2xl mb-5">{nota.titulo}</h3>
                    <DropDown />
                  </div>
                  <p className='italic font-thin'>"{nota.frase}"</p>
                  <div className="flex gap-5 box-border">
                    <div>
                      <p className="my-5">{nota.texto}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between mt-5 px-5">
                    <Link to={`/notas/editarNota/${nota.id}`} className='btn bg-green-500 text-white hover:bg-green-600 transition-colors'>
                      <NotePencil />
                      Editar
                    </Link>
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        setNotaSeleccionada(nota);
                        setOpen(true);
                      }}
                    >
                      <Trash weight="fill" />
                      Eliminar
                    </button>
                  </div>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="text-center md:w-[350px]">
                      <Trash weight="fill" size={56} className='mx-auto text-red-500' />
                      <div className="mx-auto my-4 w-48">
                        <h3 className="text-4xl font-black text-gray-800 mb-3">Eliminar Nota</h3>
                        <p className="text-m text-gray-500">¿Estás seguro de que deseas eliminar esta nota?</p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="btn w-full text-red-500 border-red-500 border-2 hover:bg-red-500 hover:text-white transition-colors"
                          onClick={manejarEliminar}
                        >
                          Eliminar
                        </button>
                        <button className="btn btn-light w-full" onClick={() => setOpen(false)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );

};

export default Notas;