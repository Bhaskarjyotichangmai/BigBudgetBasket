import React from 'react'
import Image,{StaticImageData} from 'next/image';
import apple from '../assets/apple.svg'
import banana from '../assets/banana.svg'
import carrot from '../assets/carrot.svg'
import spinach from '../assets/spinach.svg'
import orangejuice from '../assets/orangejuice.svg'
import pineapplejuice from '../assets/pineapplejuice.svg'
import bananashake from '../assets/bananashake.svg'
import strawberryshake from '../assets/strawberryshake.svg'

export interface Items {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image:StaticImageData;
  }
  
  interface Category {
    id:number;
    category: string;
    items: Items[];
  }
  

   export const basketItems: Category[] = [
    {
      id:1,
      category: 'Fruits',
      items: [
        { id: 1, name: 'Apple', quantity: 1, price:50,image:apple},
        { id: 2, name: 'Banana', quantity: 1, price: 15,image:banana},
      ]
    },
    {
      id:2,
      category: 'Vegetables',
      items: [
        { id: 3, name: 'Carrot', quantity: 1, price: 20,image:carrot },
        { id: 4, name: 'Spinach', quantity: 1, price: 30,image:spinach},
      ]
    },
    {
      id:3,
      category: 'Juice',
      items: [
        { id: 5, name: 'Orange Juice', quantity: 1, price: 40,image:orangejuice},
        { id: 6, name: 'Pineapple Juice', quantity: 1, price: 35,image:pineapplejuice},
      ]
    },
    {
      id:4,
      category: 'Shakes',
      items: [
        { id: 7, name: 'Banana Shake', quantity: 1, price: 45,image:bananashake},
        { id: 8, name: 'Strawberry Shake', quantity: 1, price: 50,image:strawberryshake},
      ]
    }
  ];
 
