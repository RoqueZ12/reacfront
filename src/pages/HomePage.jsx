import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Cards} from "../components/Card";
import "../styles/homeProducts.css";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 const [user, setUser] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem("nombre") || "";
    const email = localStorage.getItem("email") || "";
    const image = localStorage.getItem("image") || "";
    setUser({ nombre, email, image });

    fetch("https://apirestphp.onrender.com/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
<>
    <NavBar email={user?.email} nombre={user?.nombre} image={user?.image} />
       <h2 className="products-title">Productos</h2>
      <div className="products-container">
        {products.map((p) => (
          <Cards key={p.id} productId={p.id} title={p.nombre} text={`$${p.precio}`} imgSrc={p.image}  stock={p.cantidad} price={p.precio} />
        ))}
      </div>

</>
  );
};

export {HomePage}
