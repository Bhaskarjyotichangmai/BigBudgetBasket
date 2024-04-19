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
import milk from '../assets/milk.svg'
import ghee from '../assets/ghee.svg'
import exotic from '../assets/composition-with-tropical-fruits-wooden-surface.svg'
import category from '../assets/category.svg'
import fish from '../assets/fish 1.svg'
import meat from '../assets/meat.svg'
import eggs from '../assets/eggs 1.svg'
import spices from '../assets/spices 1.svg'
import vegetables from '../assets/vegetables 1.svg'
import yogurt from '../assets/yogurt 1.svg'
import juices from '../assets/juice 1.svg'

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
  
  interface topButtonItems{
    id:number;
    image:StaticImageData;
    name:string
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
 
  export const sliderItems: topButtonItems[] = [
   {id:1,image:category,name:category},
   {id:2,image:exotic,name:exotic},
   {id:3,image:milk,name:milk},
   {id:4,image:ghee,name:ghee},
   {id:5,image:meat,name:meat},
   {id:6,image:fish,name:fish},
   {id:7,image:eggs,name:eggs},
   {id:8,image:yogurt,name:yogurt},
   {id:9,image:juices,name:juices},
   {id:10,image:vegetables,name:vegetables},
   {id:11,image:spices,name:spices},
  ]