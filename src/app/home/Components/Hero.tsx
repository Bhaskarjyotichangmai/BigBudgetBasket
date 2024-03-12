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
    speed: 400,
    slidesToShow:1,
    slidesToScroll: 1,
  };

  return (
    // <div className="item-card p-4 flex justify-center cursor-pointer w-full h-full items-center">
    //     <Slider {...settings}>
    //     {slidingImages.map(slidingImages => (
    //        <Box key={slidingImages.id} sx={{ width: "100%", height: "100%" }}>
    //        <Image
    //            src={slidingImages.image}
    //            alt={slidingImages.name}
    //            width={500}
    //            height={400}
    //            layout="responsive"
    //        />
    //    </Box>
    //     ))}
    //         </Slider>
    //   </div>
    <Grid container className="item-card p-4 justify-center cursor-pointer w-full h-full items-center">
    <Slider {...settings}>
        {slidingImages.map(slidingImages => (
            <Grid key={slidingImages.id} item xs={12}>
                <Box sx={{ width: "100%", height: "100%" }}>
                    <Image
                        src={slidingImages.image}
                        alt={slidingImages.name}
                        width={400}
                        height={400}
                        layout="responsive"
                    />
                </Box>
            </Grid>
        ))}
    </Slider>
    </Grid>
  
  )
}

export default Hero;