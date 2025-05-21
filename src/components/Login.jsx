// src/components/Login.jsx
import { GoogleButton } from "./GoogleBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Mini E-Commerce</h2>
      

        <form >
          <label>Correo electrónico:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
          <label>Contraseña:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <button type="submit" className="login-btn">Iniciar sesión</button>
          
        </form>
        <button id="register" className="login-btn" onClick={() => navigate("/register")} style={{ marginTop: '10px' }}>Registrate</button>
        <div className="divider">o</div>

       
        <GoogleButton />
      </div>
    </div>
  );
};

export {Login}
