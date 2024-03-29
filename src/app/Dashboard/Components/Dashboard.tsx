'use client'
import React,{ChangeEvent, ReactNode} from 'react'
import { TextField,InputAdornment, Box, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import axios from 'axios'

import search from '../../Assets/search.png'
import Hero from './Hero'
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'
import { useState } from 'react'
import { unknown } from 'zod'
import item1 from '../../Assets/image 3.png'
import item2 from '../../Assets/image5.png'
import item3 from '../../Assets/image7.png'
import item4 from '../../Assets/image1.png'
import item5 from '../../Assets/image 11.png'
import item6 from '../../Assets/image 12.png'
import item7 from '../../Assets/image 13.png'
import item8 from '../../Assets/image 14.png'
import item9 from '../../Assets/image 15.png'
import item10 from '../../Assets/image 16.png'
import item11 from '../../Assets/image 28.png'
import item12 from '../../Assets/image 29.png'
import item13 from '../../Assets/image 18.png'
import item14 from '../../Assets/image 19.png'
import item15 from '../../Assets/image 20.png'
import item16 from '../../Assets/image 21.png'
import item17 from '../../Assets/image 22.png'
import item18 from '../../Assets/image 30.png'
import item19 from '../../Assets/image 31.png'
import item20 from '../../Assets/image 32.png'
import item21 from '../../Assets/image 33.png'

export default function Dashboard() {

  function handleSearch() {
    console.log('Searching...')
 }


 const [addedItems, setAddedItems] = useState<number[]>([]);

 const [basketItems, setBasketItems] = useState([
  { id: 1, name: 'Item1', quantity: 1,price:50},
  { id: 2, name: 'Item2', quantity: 1,price:15},
  { id: 3, name: 'Item3', quantity: 1,price:80},
  { id: 4, name: 'Item4', quantity: 1,price:60}
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

const popularItems=[
       { id:1,name:'Popularitem1',image:item5},
       { id:2,name:'Popularitem2',image:item6},
]
const fruitsAndVegetablesItems=[
    {id:1,name:'Fruit1',image:item7,buttonText:'Fresh vegetables'},
    {id:2,name:'Fruit2',image:item8,buttonText:'Fresh fruits'},
    {id:3,name:'Fruit3',image:item9,buttonText:'Cuts and Exotics'},
    {id:4,name:'Fruit4',image:item10,buttonText:'Herbs and Seasonings'}
]
const seasonalItems=[
    {id:1,name:'itemm1',image:item11},
    {id:2,name:'itemm2',image:item12}
]
const dailyStaples=[
    {id:1,name:'itemm3',image:item13,buttonText:'Rice'},
    {id:2,name:'itemm4',image:item14,buttonText:'Atta and Flour'},
    {id:3,name:'itemm5',image:item15,buttonText:'Oil and Ghee'},
    {id:4,name:'itemm6',image:item16,buttonText:'Dals and pulses'},
    {id:5,name:'itemm7',image:item17,buttonText:'Dry fruits'}
]
const snacksStoreItems = [
    { id: 1, name: 'itemm8', image: item18,buttonText:'Chai time snack' },
    { id: 2, name: 'itemm9', image: item19,buttonText:'Morning starters'},
    { id: 3, name: 'itemm10', image: item20,buttonText:'Pasta sauces and more'},
    { id: 4, name: 'itemm11', image: item21,buttonText:'Sweet cravings' }
  ];

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationItemId, setNotificationItemId] = useState<number | null>(null); // Track which item's button triggered the notification
  const [buttonColors, setButtonColors] = useState<{ [key: number]: string }>({});



  const handleAddToCart = async (itemId: number) => {
    const itemToAdd = basketItems.find(item => item.id === itemId);
    if (itemToAdd) {
        try {
            const token=localStorage.getItem('token');
            console.log("Token:", token);
            const response = await axios.post('http://localhost:5004/api/addtocart', {
                itemId: itemToAdd.id,
                name: itemToAdd.name,
                quantity: itemToAdd.quantity,
                price: itemToAdd.price
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) { 
                console.log('Item added to cart successfully');
                setShowNotification(true);
                setNotificationItemId(itemId); 
                setButtonColors(prevState => ({
                  ...prevState,
                  [itemId]: '#4CAF50' 
              }));
                setTimeout(() => {
                    setShowNotification(false);
                    setNotificationItemId(null); 
                    setButtonColors(prevState => ({
                      ...prevState,
                      [itemId]: '#d17e25' 
                  }));
              }, 2000);
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }
};

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
    <Box className="horizontal-boxes justify-center flex cursor-pointer">
    {categories.map((category, index) => (
                    <Box key={index} className="box">{category}</Box>
                ))}
            </Box>
    <div className="item-cards-container flex">
                {items.map(item => (
                    <div key={item.id} className='flex items-center'>
                    <Hero 
                       key={item.id} 
                       item={item} 
                       additionalItems={[]}
                       handleQuantityChange={handleQuantityChange} />
                       </div>
                ))}
            </div>
          
<div className="basket-container,font-family: 'Poppins', sans-serif;">
<h1 className='text-2xl'>My Smart Basket</h1>
<div className='basket-grid grid grid-cols-4 gap-4'>
{basketItems.map(basketItem => (
    <div key={basketItem.id}>
        <Image
        src={basketItem.id===1?item1: basketItem.id === 2 ? item2 : basketItem.id === 3 ? item3 : item4}
        alt={`Item ${basketItem.id}`}
                width={250}
                height={100}
                className='object-cover w-full'
        />
        <p>{basketItem.name}</p>
        <p>Price:Rs. {basketItem.price}</p>
        <FormControl>
            <InputLabel id={`quantity-label-${basketItem.id}`}></InputLabel>
            <Select
                labelId={`quantity-label-${basketItem.id}`}
                value={basketItem.quantity}
                onChange={(event: any) => handleQuantityChange(basketItem.id, event)}
            >
            
                {[0.5,1,1.5, 2,2.5, 3,3.5, 4].map(quantity => (
                    <MenuItem key={quantity} value={quantity}>{quantity}kg</MenuItem>
                ))}
            </Select>
  
            {showNotification && notificationItemId === basketItem.id ? (
            <Button
                 variant="contained"
                 style={{ backgroundColor:  buttonColors[basketItem.id] }} 
                 color="primary"
                 onClick={() => setShowNotification(false)}
                            >
                              Item added to cart, Add more?
             </Button>
               ) : (
                <Button
                    variant="contained"
                    style={{ backgroundColor: buttonColors[basketItem.id] || '#d17e25' }} 
                    color="primary"
                    onClick={() => handleAddToCart(basketItem.id)}
                >
                    Add to cart
                </Button>
            )}
        </FormControl>
    </div>
))}
</div>
</div>
    

            <h1 className='text-2xl'>Popular Items</h1>
            <div className="popular-items-card p-2 flex justify-center cursor-pointer">    
          {popularItems.map(popularItem => (
          <div key={popularItem.id} className="popular-item">
            <Image
              src={popularItem.image}
              alt={popularItem.name}
              className='object-cover w-full h-full p-2'
            />
          </div>
        ))}
      </div>
      <h1 className='text-2xl'>Fruits and Vegetables</h1>
      <div className="fruits-vegetables-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-8">
        {fruitsAndVegetablesItems.map(item => (
          <div key={item.id} className="fruits-vegetables-item mb-2 flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={200}
            />
             <Button className='px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg w-full h-16 mt-4' variant="contained" color="primary"style={{backgroundColor:'#d17e25'}} onClick={() => handleAddToCart(item.id)}>{item.buttonText}</Button>
          </div>
        ))}
      </div>
      <h1 className='text-2xl'>Seasonal Items in Assam</h1>
      <div className='seasonal-items-card p-2 flex justify-center cursor-pointer'>
        {seasonalItems.map(seasonalItems=><div key={seasonalItems.id} className="seasonal-items">
            <Image
              src={seasonalItems.image}
              alt={seasonalItems.name}
              className='object-cover w-full h-full p-2'
            />
          </div>
        )}
      </div>
      <h1 className='text-2xl'>Your daily staples</h1>
      <div className="daily-staples-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 lg:mb-8">
        {dailyStaples.map(item => (
          <div key={item.id} className="daily-staples-item mb-4 flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              className='object-cover w-full h-full p-2'
            />
             <Button className='justify-center flex mt-2 p-2 text-xs w-full' variant='contained' color="primary"style={{backgroundColor:'#d17e25'}} onClick={() => handleAddToCart(item.id)}>{item.buttonText}</Button>
          </div>
        ))}
      </div>
      <h1 className='text-2xl'>Snacks store</h1>
      <div className='sweets-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-16'>
        {snacksStoreItems.map(item=>(
            <div key={item.id}className='snackstoreitems'>
                <Image
                src={item.image} 
                alt={item.name}
                className='object-cover w-full h-full p-2'
                />
                <Button className='px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg w-full lg:w-full md:w-auto' variant='contained' color="primary"style={{backgroundColor:'#d17e25'}} onClick={() => handleAddToCart(item.id)}>{item.buttonText}</Button>
            </div>
        ))}
      </div>
      </div>       
      );
}

