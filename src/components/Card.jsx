import { Button } from '@mantine/core';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/CartContext';
import { useEffect, useState } from 'react';
import "../styles/card.css";

function Cards({ title, text, imgSrc, productId, stock, price }) {
  const { cart, addToCart, removeFromCart } = useCartContext();

  const [isInCart, setIsInCart] = useState(false);

  // Verificar si el producto ya está en el carrito cada vez que cart cambia o el productId
  useEffect(() => {
    const productInCart = cart.some(item => item.id === productId);
    setIsInCart(productInCart);
  }, [cart, productId]);

  const handleButtonClick = () => {
    if (isInCart) {
      // Quitar producto
      removeFromCart(productId);
    } else {
      // Agregar producto
      const product = {
        id: productId,
        title,
        price,
        image: imgSrc,
        stock,
        quantity: 1,
      };
      addToCart(product);
    }
  };

  // Color del botón según estado
  const getButtonColor = () => {
    if (stock === 0) return 'red'; // Sin stock
    if (isInCart) return 'gray'; // Producto en carrito (botón para quitar)
    return 'blue'; // Producto no agregado
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgSrc} className="card-img-top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>Stock: {stock}</Card.Text>
        <Button
          variant="outline"
          className="w-100"
          onClick={handleButtonClick}
          disabled={stock === 0} // Solo deshabilitar si no hay stock
          style={{ backgroundColor: getButtonColor(), borderColor: getButtonColor(), color: 'white' }}
        >
          {isInCart ? 'Quitar del carrito' : 'Agregar al carrito'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export { Cards };
