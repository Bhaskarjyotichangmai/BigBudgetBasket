import React from 'react'
import Image, { StaticImageData } from 'next/image';
import image from '../../Assets/image.png'
import imagee from '../../Assets/imagee.png'
import item1 from '../../Assets/image1.png'
import item2 from '../../Assets/image5.png'
import item3 from '../../Assets/image7.png'
import item4 from '../../Assets/image11.png'
import { FormControl,InputLabel,Select,MenuItem,SelectChangeEvent} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Box,Grid} from '@mui/material'


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
const slidingImages=[
    {id:1,name:'imagge1',image:image},
    {id:2,name:'imagge2',image:imagee}
]

interface HeroProps {
  item: Item;
  additionalItems: AdditionalItem[];
  handleQuantityChange: (itemId: number,  event: React.ChangeEvent<{ value: unknown; }>) => void;
}

function Hero({ item }: HeroProps) {
 

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1200,
  };

  return (
    <Grid container className="item-card grid grid-cols-1 lg-grid-cols-1 p-2 justify-center cursor-pointer w-full h-full items-center py-4 lg:w-3/4 lg:mx-auto">
    <Slider {...settings} >
        {slidingImages.map(slidingImages => (
            <Grid key={slidingImages.id} item xs='auto' > 
                <Box sx={{ width:"100%", height: "100%"}}>
                    <Image
                        src={slidingImages.image}
                        alt={slidingImages.name}
                        layout='responsive'
                        objectFit='cover'
                        className='object-cover'
                        width={200}
                        height={100}
                    />
                </Box>
            </Grid>
        ))}
    </Slider>
    </Grid>
  )
}

export default Hero;