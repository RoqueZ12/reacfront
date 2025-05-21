import { useEffect } from 'react';
import { Table } from '@mantine/core';
import { useCartContext } from '../context/CartContext';
import '../styles/cartTable.css'; // Asegúrate de que esto está

function Cart() {
  const { cart, fetchCart, increaseQuantity, decreaseQuantity } = useCartContext();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-table-container">
      <Table
        captionSide="bottom"
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Producto</Table.Th>
            <Table.Th>Cantidad</Table.Th>
            <Table.Th>Precio</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Imagen</Table.Th>
            <Table.Th>Acciones</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
  {(cart && Array.isArray(cart) ? cart : []).map((item) => (
    <Table.Tr key={`${item.id}-${item.nombre}`}>
      <Table.Td>{item.title}</Table.Td>
<Table.Td>
  <button onClick={() => decreaseQuantity(item.id)}>-</button>
  <span style={{ margin: '0 8px' }}>{item.quantity}</span>
  <button onClick={() => increaseQuantity(item.id)}>+</button>
</Table.Td>

      <Table.Td>{'S/. ' + Number(item.price).toFixed(2)}</Table.Td>
      <Table.Td>
        {'S/. ' + (item.quantity * item.price).toFixed(2)}
      </Table.Td>
      <Table.Td>
        <img src={item.image} alt={item.image} style={{ width: '50px', height: '50px' }} />
      </Table.Td>
      <Table.Td>
        <div className="cart-actions">
          <button>Eliminar</button>
        </div>
      </Table.Td>
    </Table.Tr>
  ))}
</Table.Tbody>

      </Table>
    </div>
  );
}

function sumarPrecios(cart) {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export { Cart, sumarPrecios };
