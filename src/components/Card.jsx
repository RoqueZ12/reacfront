import { Button } from '@mantine/core';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';
import "../styles/card.css";

function Cards({ title, text, imgSrc, productId, stock, price }) {
  const { addToCart } = useCartContext();

  const [buttonText, setButtonText] = useState("Agregar al carrito");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAddProduct = () => {
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
    setIsDisabled(true);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgSrc} className="card-img-top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>Stock: {stock}</Card.Text>
        <Button
          variant="outline-primary"
          className="w-100"
          onClick={handleAddProduct} // ✅ corregido
          disabled={isDisabled}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export { Cards };
