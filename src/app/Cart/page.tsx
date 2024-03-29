'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { green } from '@mui/material/colors';
import { Button } from '@mui/material';

interface CartItem {
    itemId: number;
    name: string;
    quantity: number;
    price: number;
}
function page() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Fetch cart items from the server when the component mounts
        fetchCartItems();
      }, []);

    const fetchCartItems = async () => {
        try {
          const token = localStorage.getItem("token");
            const response = await axios.get<CartItem[]>('http://localhost:5004/api/cart-items', {
              headers: {
                Authorization: `Bearer ${token}`
              }
              });
            if (response.status === 200) {
                setCartItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    const handleDeleteItem = async (itemId: number) => {
      try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:5004/api/deleteCartItem/${itemId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          fetchCartItems();
      } catch (error) {
          console.error('Error deleting cart item:', error);
      }
  };
  return (
    <div>
    <h1>My Cart</h1>
    <div>
      {cartItems.map((item) => (
        <div key={item.itemId}>
          <p>{item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <Button style={{ backgroundColor:'brown'}} onClick={() => handleDeleteItem(item.itemId)}>Delete</Button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default page
