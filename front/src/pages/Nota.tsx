import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { obtenerNotaPorId } from "../services/notas";
import waves from "../assets/stack-waves.svg"

function Nota() {

  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [frase, setFrase] = useState('');

  const { id } = useParams<{ id: string }>();

  const notaId = parseInt(id || '0', 10);

  useEffect(() => {
    const cargarNota = async () => {
      try {
        const data = await obtenerNotaPorId(notaId);
        const nota = data.body[0];
        setTitulo(nota.titulo);
        setFrase(nota.frase);
        setTexto(nota.texto);
      } catch (error) {
        console.error('Error al cargar la nota', error);
      }
    }

    cargarNota();
  }, [notaId]);

  return (
    <>
      <Header />
    
        <div className="max-w-screen-lg mx-auto py-2 min-h-screen relative">
          <h1 className="text-4xl font-bold my-5 rounded-md bg-white dark:bg-gray-800 px-3 py-2">{titulo}</h1>
          <p className="text-xl italic">{frase}</p>
          <div className="px-5 py-2 rounded-md bg-white shadow dark:bg-gray-800">
            <p className="leading-loose">{texto}</p>
          </div>
        </div>
    </>
  )
}

export default Nota