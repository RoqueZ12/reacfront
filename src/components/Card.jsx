import { Button } from '@mantine/core';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';
import "../styles/card.css";

function Cards({ title, text, imgSrc, productId, stock, price }) {
  const { addToCart } = useCartContext();

  const [buttonText, setButtonText] = useState("Agregar al carrito");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Nuevo estado para controlar si el producto está agregado

  const handleAddProduct = () => {
    if (isDisabled) return;

    setIsDisabled(true); // Desactiva el botón inmediatamente
    const product = {
      id: productId,
      title,
      price,
      image: imgSrc,
      stock,
      quantity: 1,
    };

    addToCart(product);
    alert("Añadido al carrito: " + product.id);
    setButtonText("Añadido al carrito");
    setIsAdded(true); // Cambia el estado para indicar que el producto fue añadido
  };

  // Función para obtener el color del botón
  const getButtonColor = () => {
    if (isAdded) {
      return 'gray'; // Color cuando el producto ha sido añadido y el botón está deshabilitado
    } else if (stock === 0) {
      return 'red'; // Rojo si el producto no está disponible
    }
    return 'blue'; // Color predeterminado (disponible)
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
          onClick={handleAddProduct} 
          disabled={isDisabled || stock === 0} // Deshabilita si el producto no está disponible o ya está en el carrito
          style={{ backgroundColor: getButtonColor(), borderColor: getButtonColor() }} // Cambia el color
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export { Cards };
