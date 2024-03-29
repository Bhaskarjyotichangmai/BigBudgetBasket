import React from 'react'
import Image from 'next/image'
import backgroundimg from '../../Assets/backgroundimg.svg'
import '../Components/Background.css'

function Background() {
  return (
    <Image
    src={backgroundimg}
    alt='background image'
    className='background_img'
    style={{
        objectFit:'cover',
        width:'100%',
        height:'100%',
        objectPosition:'left'
     }}
    />
  )
}

export default Background