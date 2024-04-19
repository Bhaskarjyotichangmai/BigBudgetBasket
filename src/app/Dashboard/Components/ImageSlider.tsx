import React, { useState, useEffect } from 'react';
import { sliderItems } from '@/app/(Items)/Items';
import Image from 'next/image';
import milk from '../../assets/milk.svg';
import ghee from '../../assets/ghee.svg';
import exotic from '../../assets/composition-with-tropical-fruits-wooden-surface.svg';
import category from '../../assets/category.svg';
import Slider from 'react-slick';
import {Box,Grid} from '@mui/material'

interface ImageSliderProps {
  currentSlide: number;
  onHoverSlideChange?: (index: number) => void;
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
  };
  
  const ImageSlider: React.FC<ImageSliderProps> = ({ currentSlide, onHoverSlideChange=() => {} }) => {
    const sliderRef = React.useRef<Slider>(null);

    React.useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide);
      }
    }, [currentSlide]);
    return (
        <Grid container className="item-card grid grid-cols-1 lg-grid-cols-1 p-2 justify-center cursor-pointer w-full h-full items-center py-4 lg:w-2/4 lg:mx-auto">
          <Slider {...settings} ref={sliderRef} initialSlide={currentSlide} beforeChange={(_, newIndex) => onHoverSlideChange(newIndex)}>
            {sliderItems.map((item, index) => (
              <Grid key={index} item xs={12} sx={{ width: '100%', height: 'auto' }}>
              <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                {/* <div style={{ maxWidth: '100%', height: '500px', overflow: 'hidden' }}> */}
                <div className="w-full lg:w-auto h-[500px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`Slider ${index}`}
                    layout="responsive"
                    objectFit="cover"
                    className="object-cover"
                    // width={1600}
                    // height={400}
                  />
                </div>
              </Box>
            </Grid>
            ))}
          </Slider>
        </Grid>
      );
    };
  

export default ImageSlider;
