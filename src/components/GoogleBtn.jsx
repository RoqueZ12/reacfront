import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate(); 

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("https://backphp.onrender.com/loginGoogle.php", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`  // <-- Importante
      },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok && data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        navigate("/home"); // Redirige a la ruta de HomePage
      } else {
        console.error("Error del backend:", data.error || "Respuesta inválida");
      }
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded shadow-md px-4 py-2 hover:bg-gray-100">
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"/>
      Iniciar sesión con Google
    </button>

  );
};

export { GoogleButton };
