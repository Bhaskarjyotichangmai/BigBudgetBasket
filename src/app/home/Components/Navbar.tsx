'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import menulogo from './../../Assets/menu.png'
import logo from './../../Assets/finallogo.png'
import { IoClose } from "react-icons/io5";
import home from '../../Assets/home.png'
import information from '../../Assets/information.png'
import telephone from '../../Assets/telephone.png'
import clsx from 'clsx'
import settings from '../../Assets/settings.png'
import usericon from '../../Assets/user.png'




function Navbar() {
    const[isSideMenuOpen,setMenu]= useState(false);
    
    const navLinks=[
        {
            label:'Home',
            href:'#',
            icon:home,
        },
        {
            label:'Information',
            href:'#',
            icon:information,
        },
        {
            label:'Contact us',
            href:'#',
            icon:telephone,
        }

    ];
    const bottomNavLinks = [
      {
          label: 'Settings',
          href: '#',
          icon: settings,
      },
      {
          label: 'User',
          href: '#',
          icon: usericon,
      }
  ];

  return (
    <main>
        <nav className='navbar flex justify-between px-8 items-center py-6 bg-blue-500'>
          <div className='flex items-center gap-8 justify-between'>
      <section className='flex items-center gap-4 '>
        {/* menu */}
        <Image src={menulogo} onClick={()=>setMenu(true)} alt='menu' width={24} height={24} className='text-3x1 cursor-pointer'/>
          {/* logo */}
        
            <div className='text-xl text-white bg-opacity-80 font-bold cursor-pointer rounded-full'>
                TheFreshEats
            </div>
        
       
      </section>
      {navLinks.map((d,i)=>(
         <Link key={i} href={d.href} className='hidden lg:block text-gray-600 hover:text-black'>
             {d.label}
      </Link>
       ))}
       {bottomNavLinks.map((e, g) => (
          <Link key={g} href={e.href} className='hidden lg:block text-gray-600 hover:text-black'>
              
              {e.label}
          </Link>
         ))}                     
      </div>
      <Link href={'/'}>
      <button className='text-sm font-bold bg-gray-300 rounded-sm'>Login/Signup</button>
      </Link>
        

      {/* {sidebar mobile menu} */}
      <div className={clsx(
        "fixed h-full w-screen lg-hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
        isSideMenuOpen && "translate-x-0"
      )}
      >
         <section className='text-black backdrop-blur-sm bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50
         w-56 flex'>
         <IoClose 
           onClick={()=>setMenu(false)}
           className='mt-0 mb-8 text-3xl cursor-pointer'/>
        
        
         {navLinks.map((d,i)=>(
         <Link key={i} href={d.href} className='font-bold flex items-center'>
         <div className='mr-2'>
         <Image src={d.icon} alt={d.label} width={24} height={24}/>
             </div>
             {d.label}
      </Link>
       ))}

         <div className='mt-auto'>
         {bottomNavLinks.map((e, g) => (
          <Link key={g} href={e.href} className=' font-bold flex items-center'>
              <div className='mr-2'>
                  <Image src={e.icon} alt={e.label} width={24} height={24} />
              </div>
              {e.label}
          </Link>
         ))}        
         </div>         
          </section>
      </div>
      </nav>
 
    </main>
    )
}

export default Navbar