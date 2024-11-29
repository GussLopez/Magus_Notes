import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { DarkModeProvider } from "./interfaces/DarkMode";
import Home from "./pages/Home";
import Notas from "./pages/Notas";
import AuthSlider from "./pages/AuthSlider";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notas />} />
          <Route path="/login" element={<AuthSlider />} />
          <Route path="/register" element={<AuthSlider initialMode="register" />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;

