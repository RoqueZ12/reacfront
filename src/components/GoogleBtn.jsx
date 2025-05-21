// src/components/GoogleButton.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";


const GoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Envía el idToken a tu backend
        const response = await fetch("https://backphp.onrender.com/loginGoogle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        });


      const data = await response.json();
      console.log("JWT del backend:", data.jwt);
   
      // Guarda el JWT si lo necesitas
      localStorage.setItem("jwt", data.jwt);
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Iniciar sesión con Google
    </button>
  );
};

export {GoogleButton};
