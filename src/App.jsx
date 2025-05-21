import { Login } from './components/Login';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { PrivateRoute } from './components/PrivateRoute';
import { Routes, Route } from "react-router-dom"; // 👈 NO uses BrowserRouter aquí
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<Login />} />
      <Route path="/cart" element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
