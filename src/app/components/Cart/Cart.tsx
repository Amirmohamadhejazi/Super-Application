"use client"
import React, { useState } from 'react';

// Define custom types for Product and CartItem
type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const Cart: React.FC = () => {
  // State to manage the list of products
  const [products] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);

  // State to manage the shopping cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    const existingCartItem = cart.find((item) => item.product.id === product.id);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  }; 
  
  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className='m-5'>   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 wrap my-3" >
            {products.map((product) => (
                    <div className="bg-white flex  font-medium  flex-col gap-y-2 p-4 shadow rounded-lg"  key={product.id}>
                        <div className='w-full h-32 animate-pulse bg-gray-400 rounded flex justify-center items-center'>
                            <span className='text-xl'>img</span>
                        </div>
                        <h2 className="text-xl ">{product.name}</h2>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <div className='flex justify-end'>
                            <p className="w-[150px] text-white text-center bg-green-800 rounded p-2 cursor-pointer "  onClick={() => addToCart(product)}>Add</p>
                        </div>
                    </div>
                

            ))}
        </div>
       { 
        cart.map((items : CartItem ,index : number)=>
            <div className='flex flex-col gap-2' key={index}>
                <div className='bg-blue-300 p-2 m-2 rounded flex justify-between'>
                    <span>  {items.product.name}</span>
                    <span>per Price {items.product.price }</span>
                    <span>  Total Price: ${items.product.price * items.quantity}</span>
                    <div className='flex gap-2 items-center'>
                        <span>{items.quantity}</span>
                        <span className='cursor-pointer font-bold bg-white w-5 h-5 rounded flex justify-center items-center' onClick={() => removeFromCart(items.product.id)}>-</span>
                    </div>
                </div>
            </div>
        )
      } 

    {
        calculateTotalPrice() > 0 && <div className='flex flex-col gap-2' >
            <div className='bg-red-600 p-2 m-2 rounded flex justify-between  items-center'>
                <span>  Total</span>
                
                <div className='flex gap-2 items-center'> 
                    <span className='bg-gray-500 rounded  text-white p-2'>{calculateTotalPrice()}$ </span>
                </div>
            </div>
        </div>
    } 
    </div>
  );
};

export default Cart;
