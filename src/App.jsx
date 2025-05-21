import { Login } from './components/Login';
import { HomePage } from './pages/HomePage';
import { Routes, Route } from "react-router-dom"; // 👈 NO uses BrowserRouter aquí
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Login />} />
      
    </Routes>
  );
}

export default App;
