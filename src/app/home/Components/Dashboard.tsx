import React from 'react'
import { TextField,InputAdornment, Box, Button } from '@mui/material'
import Image from 'next/image'
import './Hero'

import search from '../../Assets/search.png'
import Hero from './Hero'
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'


export default function Dashboard() {
  function handleSearch() {
    console.log('Searching...')
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
  { id: 1, name: 'Item 1', description: 'Description of Item 1', price: 10.99,image:image },
  { id: 2, name: 'Item 2', description: 'Description of Item 2', price: 15.99 },
  { id: 3, name: 'Item 3', description: 'Description of Item 3', price: 20.99 },
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
    <Box className="horizontal-boxes">
    {categories.map((category, index) => (
                    <Box key={index} className="box">{category}</Box>
                ))}
            </Box>
    <div className="item-cards-container">
                {items.map(item => (
                    <Hero key={item.id} item={item} />
                ))}
            </div>
    </div>
  )
}

