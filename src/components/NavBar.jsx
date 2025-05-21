import React from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "../firebase/config"; // Tu función de logout desde Firebase

const NavBar = ({ email, nombre }) => {
    const navigate = useNavigate();

    const handleLogOutGoogle = async () => {
        try {
            await signOut(); // Cierra sesión en Firebase
            localStorage.removeItem("token"); // Elimina el token del almacenamiento local
            navigate("/"); // Redirige al home
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ borderRight: '1px solid #fff', paddingRight: '1rem' }}>{nombre}</span>
                    <span style={{ borderRight: '1px solid #fff', paddingRight: '1rem' }}>{email}</span>
                    <span onClick={() => navigate("/cart")} style={{ cursor: 'pointer' }}>🛒</span>
                    <button
                        style={{ marginLeft: '1rem' }}
                        onClick={handleLogOutGoogle}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export { NavBar };
