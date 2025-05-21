import { Login } from './components/Login'
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

function App() {


 return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App
