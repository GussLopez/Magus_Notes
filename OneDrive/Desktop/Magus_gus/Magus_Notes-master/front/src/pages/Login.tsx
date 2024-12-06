import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; 

export default function AuthApp() {
    const [isLogin, setIsLogin] = useState(true); 
    
    return (
        <div className="auth-container">
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
        </div>
    );
}

function LoginForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, formData);
            alert('Inicio de sesión exitoso');
            console.log('Token:', response.data);
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <label>
                Usuario:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Contraseña:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

function RegisterForm() {
    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        activo: 1,
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/usuarios`, formData);
            alert('Registro exitoso');
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            alert('Error al registrarse: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <label>
                Nombre:
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Apellido:
                <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Correo:
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Teléfono:
                <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
            </label>
            <label>
                Usuario:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Contraseña:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Registrarse</button>
        </form>
    );
}