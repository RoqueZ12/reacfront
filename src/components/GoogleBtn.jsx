import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate(); // hook de react-router-dom

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      console.log("ID Token enviado:", idToken);
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
        console.log("Respuesta del backend:", data);
        console.log("JWT del backend:", data.jwt);
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
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Iniciar sesión con Google
    </button>
  );
};

export { GoogleButton };
