import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase/config'; // Se importan las funciones de autenticación y Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Importación para firestore

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // ⬅️ Guarda el usuario autenticado
  const [loading, setLoading] = useState(true); // ⬅️ Estado de carga
  const [hasFetchedCart, setHasFetchedCart] = useState(false); // Estado para verificar si ya se obtuvo el carrito

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Guarda el usuario cuando esté disponible
    });
    return () => unsubscribe(); 
  }, []);

  
  useEffect(() => {
    if (user && !hasFetchedCart) {
      fetchCart(user); // Llama al carrito cuando ya esté autenticado y el carrito no se haya obtenido aún
    }
  }, [user, hasFetchedCart]);  // Solo vuelve a ejecutarse si `user` cambia

  // FUNCION OBTENER CARRITO
  const fetchCart = async (firebaseUser) => {
    setLoading(true); // Inicia la carga

    if (!firebaseUser) {
      console.warn("fetchCart: Usuario aún no autenticado");
      setLoading(false);
      return;
    }

    try {
      const userUid = firebaseUser.uid;

      // Referencia al documento del carrito en Firestore
      const cartDocRef = doc(db, "carritos", userUid);

      // Obtener el documento
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        const cartData = cartDocSnap.data(); // Obtener los datos del carrito
        console.log("Carrito obtenido de Firestore:", cartData);

        if (cartData.cart && Array.isArray(cartData.cart)) {
          setCart(cartData.cart); // Actualiza el estado con los productos en el carrito
        } else {
          console.warn("Carrito vacío o datos inválidos en Firestore para el usuario", userUid);
        }
      } else {
        console.warn("Carrito no encontrado en Firestore para el usuario", userUid);
      }
    } catch (error) {
      console.error("Error al obtener el carrito desde Firestore:", error);
    }

    setLoading(false); // Finaliza la carga
    setHasFetchedCart(true); // Marca que ya se ha fetchado el carrito
  };

  // FUNCION AGREGAR AL CARRITO
  const addToCart = async (product) => {
    console.log("addToCart: ", product);

    if (!user) {
      console.error('addToCart: Usuario no autenticado');
      return;
    }

    if (!product || !product.id || !product.price || !product.title || !product.image) {
      console.error('addToCart: Producto con datos incompletos', product);
      return;
    }

    try {
      // Buscar si el producto ya está en el carrito local
      const existingIndex = cart.findIndex(p => p.id === product.id);
      let updatedCart;

      if (existingIndex !== -1) {
        // Ya existe → actualizar cantidad
        updatedCart = cart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // No existe → agregar nuevo producto con quantity: 1
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      // Actualizar estado local
      setCart(updatedCart);

      // Guardar en Firestore (carritos/{user.uid})
      const cartRef = doc(db, 'carritos', user.uid);
      await setDoc(cartRef, { cart: updatedCart }, { merge: true });

      console.log("Producto agregado correctamente al carrito en Firestore");

    } catch (error) {
      console.error("Error en addToCart:", error);
    }
  };

  // FUNCION LIMPIAR CARRITO
  const clearCart = async () => {
    try {
      setCart([]);
      
      // Limpiar carrito en Firestore (carritos/{user.uid})
      if (user) {
        const cartRef = doc(db, 'carritos', user.uid);
        await setDoc(cartRef, { cart: [] }, { merge: true });
      }

      console.log("Carrito limpiado correctamente en Firestore");
    } catch (error) {
      console.error("Error al limpiar el carrito en Firestore:", error);
    }
  };
const updateCartInFirestore = async (updatedCart) => {
  if (!user) return;
  const cartRef = doc(db, 'carritos', user.uid);
  await setDoc(cartRef, { cart: updatedCart }, { merge: true });
};

const increaseQuantity = async (productId) => {
  const updatedCart = cart.map(item =>
    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
  );
  setCart(updatedCart);
  await updateCartInFirestore(updatedCart);
};

const decreaseQuantity = async (productId) => {
  const updatedCart = cart
    .map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    )
    .filter(item => item.quantity > 0); // opcional: remover si quantity es 0

  setCart(updatedCart);
  await updateCartInFirestore(updatedCart);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, fetchCart, clearCart, loading, increaseQuantity, decreaseQuantity, user }}>

      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
