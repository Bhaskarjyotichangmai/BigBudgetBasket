'use client'
import React from 'react'
import { TextField,InputAdornment, Box, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import './Hero'

import search from '../../Assets/search.png'
import Hero from './Hero'
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'
import { useState } from 'react'
import { unknown } from 'zod'
import item1 from '../../Assets/image1.png'
import item2 from '../../Assets/image5.png'
import item3 from '../../Assets/image7.png'
import item4 from '../../Assets/image11.png'


export default function Dashboard() {

  function handleSearch() {
    console.log('Searching...')
 }
 const [basketItems, setBasketItems] = useState([
  { id: 1, name: 'Item 1', quantity: 1 },
  { id: 2, name: 'Item 2', quantity: 1 },
  { id: 3, name: 'Item 3', quantity: 1 },
  { id: 4, name: 'Item 4', quantity: 1 }
]);
function handleQuantityChange(itemId:number, event:React.ChangeEvent<{value:unknown}>) {
  const updatedBasketItems = basketItems.map(item => {
      if (item.id === itemId) {
          return { ...item, quantity: event.target.value as number};
      }
      return item;
  });
  setBasketItems(updatedBasketItems);
}
 const categories = [
  'Shop by category',
  'Exotic fruits and vegetables',
  'Nandini',
  'Ghee',
  'Meat',
  'Fish',
  '>>'
];


 const items = [
  { id: 1, name: 'Item 1',  image:image,imagee:imagee},
];
  return (
 <div>
    <div className='flex justify-end'>
        <div className='ml-auto'>
        <TextField  
                  type="text"
                  placeholder="Search for products"
                  className="border border-gray-800 rounded-sm p-2 mb-4 "
                  variant='outlined'
                 InputProps={{
                  startAdornment: (
                    
                    <InputAdornment position="start">
                    
                     <Image 
                     src={search} 
                     alt='Search Icon' 
                     width={24} 
                     height={24}
                     className='cursor-pointer'                     
                    />
                   
                    </InputAdornment>
                    
                )
                }}
                />
        </div>
    </div>
    <Box className="horizontal-boxes justify-center flex ">
    {categories.map((category, index) => (
                    <Box key={index} className="box">{category}</Box>
                ))}
            </Box>
    <div className="item-cards-container flex">
                {items.map(item => (
                    <Hero key={item.id} item={item} additionalItems={[]} />
                ))}
            </div>
            <div className="basket-container">
                <h2>My Smart Basket</h2>
                {basketItems.map(basketItem => (
                    <div key={basketItem.id}>
                        <p>{basketItem.name}</p>
                        <FormControl>
                            <InputLabel id={`quantity-label-${basketItem.id}`}>Qty</InputLabel>
                            <Select
                                labelId={`quantity-label-${basketItem.id}`}
                                value={basketItem.quantity}
                                onChange={(event:SelectChangeEvent<number>) => handleQuantityChange(basketItem.id,event)}
                            >
                                {[1, 2, 3, 4].map(quantity => (
                                    <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                ))}
            </div>
    </div>
  )
}

