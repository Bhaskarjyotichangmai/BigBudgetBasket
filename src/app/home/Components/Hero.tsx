import React from 'react'
import Image from 'next/image';
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
}
function Hero({item}:{item:any}) {
  return (
      <div className="item-card">
        <div className='image-container'>
            <Image
              src={item.image}
              alt='image'
              width={400}
              height={200}
            />
        </div>
    <h2>{item.name}</h2>
    <p>{item.description}</p>
    <p>Price: {item.price}</p>
</div>
  )
}

export default Hero