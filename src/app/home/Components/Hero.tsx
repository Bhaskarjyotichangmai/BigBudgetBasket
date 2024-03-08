import React from 'react'
import Image, { StaticImageData } from 'next/image';
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'
import item1 from '../../Assets/image1.png'
import item2 from '../../Assets/image5.png'
import item3 from '../../Assets/image7.png'
import item4 from '../../Assets/image11.png'
import { FormControl,InputLabel,Select,MenuItem,SelectChangeEvent} from '@mui/material';


interface Item {
    id: number;
    name: string;
    image:StaticImageData;
    imagee:StaticImageData;
}
interface AdditionalItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}


interface HeroProps {
  item: Item;
  additionalItems: AdditionalItem[];
  handleQuantityChange: (itemId: number,  event: React.ChangeEvent<{ value: unknown; }>) => void;
}

function Hero({ item, additionalItems, handleQuantityChange }: HeroProps) {
  const handleChange = (event: SelectChangeEvent<number>, itemId: number) => {
      
      const quantity = event.target.value as number;
      handleQuantityChange(itemId, quantity);
  };

  return (
      <div className="item-card p-4 flex justify-center cursor-pointer">
          <div className='w-1/2 p-2'>
              <Image
                  src={item.image}
                  alt='image'
                  className='object-cover w-full h-full'
              />
          </div>
          <div className='w-1/2 p-2'>
              <Image
                  src={item.imagee}
                  alt='imagee'
                  className='object-cover w-full h-full'
              />
          </div>
          {additionalItems.map((additionalItem) => (
              <div key={additionalItem.id} className='w-1/4 p-2'>
                  <Image
                      src={additionalItem.image}
                      alt={additionalItem.name}
                      className='object-cover w-full h-full'
                  />
              </div>
          ))}
      </div>
  )
}

export default Hero;