import { useState } from "react";
import { crearNota } from "../services/notas";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Microphone } from "@phosphor-icons/react";

const CrearNota = () => {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [frase, setFrase] = useState('');
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: 'error' | 'exito' } | null>(null);
  const [escuchando, setEscuchando] = useState(false);
  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !frase.trim() || !texto.trim()) {
      mostrarMensaje('Por favor, completa todos los campos.', 'error');
      return;
    }
    try {
      await crearNota({ titulo, texto, frase });
      mostrarMensaje('Nota creada con éxito', 'exito');
      setTitulo('');
      setTexto('');
      setFrase('');
    } catch (error) {
      console.error('Error al crear nota:', error);
      mostrarMensaje('Ocurrió un error al crear la nota.', 'error');
    }
  };
  const iniciarReconocimiento = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      mostrarMensaje('El reconocimiento de voz no es compatible con este navegador.', 'error');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.onstart = () => {
      setEscuchando(true);
    };
    recognition.onend = () => {
      setEscuchando(false);
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setTexto((prevTexto) => `${prevTexto} ${transcript}`);
    };
    recognition.onerror = (event) => {
      console.error('Error en reconocimiento de voz:', event.error);
      mostrarMensaje('Ocurrió un error al usar el reconocimiento de voz.', 'error');
    };
    recognition.start();
  };
  const mostrarMensaje = (texto: string, tipo: 'error' | 'exito') => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje(null);
    }, 5000);
  };
  return (
    <>
      <Header />
      <main>
        <div className='max-w-screen-lg mx-auto px-2 h-screen '>
          <h1 className='text-3xl font-bold my-8'>Crear Nueva Nota 🖋️</h1>
          {mensaje && (
            <p
              className={`p-3 mb-5 rounded text-center font-semibold ${mensaje.tipo === 'exito' ? 'bg-green-600 text-white motion-preset-confetti ' : 'bg-red-600 text-white'
                }`}
            >
              {mensaje.texto}
            </p>
          )}
          <form onSubmit={manejarSubmit}>
            <input
              id='titulo-nota'
              type="text"
              placeholder="Título de la Nota"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={`w-full block px-3 py-2 border rounded mb-5 outline-none`}
            />

            
            <input
              id='frase-nota'
              type="text"
              placeholder="Frase"
              value={frase}
              onChange={(e) => setFrase(e.target.value)}
              className={`w-full block px-3 py-2 border rounded mt-5 outline-none`}
            />

            <div className="relative">
              <textarea
                id='contenido-nota'
                placeholder="Contenido"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className={`w-full h-80 min-h-[350px] px-3 py-2 my-5 border rounded outline-none`}
              />
              <button
                type="button"
                onClick={iniciarReconocimiento}
                className={`absolute bottom-10 left-5 p-2 rounded text-white font-semibold ${escuchando ? 'bg-red-500' : 'bg-cyan-500 hover:bg-cyan-600 hover:rounded-xl transition-all  ease-linear'
                  }`}
              >
                {escuchando ? 'Escuchando...' : <Microphone size={22} weight="bold" />}
              </button>
            </div>
            <div className='text-right'>
              <button type="submit" className='px-3 py-2 bg-cyan-500 rounded hover:bg-cyan-600 transition-colors text-white font-semibold mr-1'>Guardar</button>
              <button type="button" className='px-3 py-2 bg-green-600 hover:bg-green-700 transition-colors rounded text-white font-semibold ml-1'>Compartir</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CrearNota;
