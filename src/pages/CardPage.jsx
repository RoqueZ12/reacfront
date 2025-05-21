import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { Table, Button, Text } from "@mantine/core";
import {Cart, sumarPrecios} from "../components/Cart";
import { useCartContext } from "../context/CartContext";

import "../styles/cartpage.css";

function CartPage() {
  const { cart } = useCartContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem("nombre") || "";
    const email = localStorage.getItem("email") || "";
    setUser({ nombre, email });
  }, []);

  return (
    <>
<NavBar email={user?.email} nombre={user?.nombre} />

        <h1>Carrito de Compras</h1>
    <div className="tableContainer">
      <Cart />
   
        <hr style={{ margin: '50px 0' }} />
        <Table captionSide="bottom" striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr style={{ textAlign: 'center' }}>
              <Table.Td className="tableCell">Total de la compra</Table.Td>
            
              <Table.Td className="tableCell">
                <div className="actionsContainer">
                 {Array.isArray(cart) && (
                  <div className="cart-total">
                    Total: S/. {sumarPrecios(cart).toFixed(2)}
                  </div>
                )}

                </div>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

    </div>
    </>
  );
}
export { CartPage };