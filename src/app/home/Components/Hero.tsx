import React from 'react'
import Image, { StaticImageData } from 'next/image';
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'
import item1 from '../../Assets/image1.png'
import item2 from '../../Assets/image5.png'
import item3 from '../../Assets/image7.png'
import item4 from '../../Assets/image11.png'
import { FormControl,InputLabel,Select,MenuItem} from '@mui/material';

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
  handleQuantityChange: (itemId: number, event: React.ChangeEvent<{ value: unknown; }>) => void;
}

function Hero({item,additionalItems,handleQuantityChange}:HeroProps) {
  return (
      <div className="item-card p-4 flex justify-center">
        
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
                      <FormControl>
                        <InputLabel id={`quantity-label-${additionalItem.id}`}>Qty</InputLabel>
                        <Select
                            labelId={`quantity-label-${additionalItem.id}`}
                            value={additionalItem.quantity}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleQuantityChange(additionalItem.id, event)}
                        >
                            {[1, 2, 3, 4].map(quantity => (
                                <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
              </div>
             ))}
             </div>
  )
}

export default Hero