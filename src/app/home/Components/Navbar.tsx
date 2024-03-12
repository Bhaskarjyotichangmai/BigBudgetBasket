'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import menulogo from './../../Assets/menu.png'
import { IoClose } from "react-icons/io5";
import home from '../../Assets/home.png'
import information from '../../Assets/information.png'
import telephone from '../../Assets/telephone.png'
import clsx from 'clsx'
import settings from '../../Assets/settings.png'
import usericon from '../../Assets/user.png'
import SignupPage from '@/app/signup/page'
import { Avatar } from '@mui/material'
import Contactus from '../NavLinks/Contactus'
import { useRouter } from 'next/navigation'

function Navbar() {
    const[isSideMenuOpen,setMenu]= useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedUsername=localStorage.getItem('username');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
        
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('email');
        setUserEmail('');
    };
    const handleAvatarClick = () => {
        setLogoutVisible(!isLogoutVisible);
    };
   
    const router=useRouter();
    const navLinks=[
        {
            label:'Home',
            href:'/Home',
            icon:home,
        },
        {
            label:'Information',
            href:'/Information',
            icon:information,
        },
        {
            label:'Contact us',
            href:'/Contactus',
            icon:telephone
        }

    ];
    const bottomNavLinks = [
      {
          label: 'Settings',
          href: '../NavLinks/Settings',
          icon: settings,
      },
      {
          label: 'User',
          href: '/',
          icon: usericon,
      }
  ];
  const handleNavLinkClick=(href:string)=>{
    router.push(href)
  }

  return (
    <main>
        <nav className='navbar flex justify-between px-8 items-center py-6 bg-blue-500'>
          <div className='flex items-center gap-8 justify-between'>
      <section className='flex items-center gap-4 '>
        
        <Image src={menulogo} onClick={()=>setMenu(true)} alt='menu' width={24} height={24} className='text-3x1 cursor-pointer'/>
          
        
            <div className='text-xl text-white bg-opacity-80 font-bold cursor-pointer rounded-full'>
                TheFreshEats
            </div>
        
      </section>
      {navLinks.map((link,index)=>(
    <Link href={link.href} key={index}>
        <div onClick={() => handleNavLinkClick(link.href)} className='hidden lg:block text-gray-600 hover:text-black'>
            {link.label}
        </div>
</Link>
       ))}
       {bottomNavLinks.map((link, index) => (
        <Link href={link.href} key={index}>
        <div onClick={() => handleNavLinkClick(link.href)} className='hidden lg:block text-gray-600 hover:text-black'>
            {link.label}
        </div>
</Link>
         ))}                     
      </div>
      
      {userEmail ? (
            <div className='flex items-center flex-col lg:flex-row lg:items-center font-bold text-xs relative'>
               <span className='mb-2 lg:mb-0 lg:mr-4'>Welcome,{userEmail}</span>
               <div className='relative'>
               <Avatar alt="User Avatar" className='cursor-pointer' src="/static/images/avatar/1.jpg"onClick={handleAvatarClick} />
               {isLogoutVisible&&(
                <div className="absolute top-full left-0 bg-black p-2 rounded-md shadow-md z-20">
                <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 py-2 w-full'>
                    item1
                </button>
                <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 py-2 w-full'>
                    item2
                </button>
                <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 py-2 w-full'>
                    item3
                </button>
                <button onClick={handleLogout} className='text-sm font-bold bg-gray-300 rounded-sm px-1 py-2 w-full'>
                    Logout
                </button>
                </div>
               )}
                </div>
                </div>
            ) : (
      <Link href={'/'}>
      <button className='text-sm font-bold bg-gray-300 rounded-sm'>Login/Signup</button>
      </Link>
            )}
     
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