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
import { useRouter } from 'next/navigation'
import { basketItems } from '@/app/(Items)/Items'
import { toast } from "react-hot-toast";
import { useSession } from 'next-auth/react';

interface Category {
    id: number;
    category: string;
    items: { id: number; name: string; quantity: number; price: number; image: string }[];
  }
function Navbar() {
    const[isSideMenuOpen,setMenu]= useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const { data: session } = useSession();
    
    const toggleCategories = () => {
        setShowCategories(!showCategories);
        setActiveSubCategory(null);
      };

      const handleCategoryClick = (categoryName: string) => {
        // If the clicked category is already active, deactivate it
        if (activeCategory === categoryName) {
          setActiveCategory(null);
        } else {
          // Otherwise, set the clicked category as active
          setActiveCategory(categoryName);
        }
        // Always reset the active subcategory when a category is clicked
        setActiveSubCategory(null);
      };
  

      useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedUsername=localStorage.getItem('username');
        const googleEmail= localStorage.getItem('googleEmail');
        const googleUsername=localStorage.getItem('googleUsername');
        const googleImage=localStorage.getItem('image');
        const googleId=localStorage.getItem('googleId');
        if (storedUsername) {
            setUserEmail(storedUsername);
        }else if (googleEmail&&googleUsername && googleImage) {
          setUserEmail(googleEmail);
          setUserName(googleUsername);
          setUserImage(googleImage);
        }
        
    }, [session]);
    
    const handleLogout = async() => {
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('googleEmail');
        localStorage.removeItem('googleUsername');
        localStorage.removeItem('image');
        localStorage.removeItem('googleId');
        localStorage.clear();
        setUserEmail(''); // Clearing the userEmail state
        setUserName(''); // Clearing the userName state
        setUserImage(''); // Clearing the userImage state
    
        setLogoutVisible(false);
       
        router.push('/'); // Redirect to the homepage
    };

    // useEffect(() => {
    //   if (session?.user) {
    //     const { name, email, image } = session.user;
    //     setUserEmail(email??'');
    //     if (name) {
    //       setUserName(name);
    //     }
    //     if (image) {
    //       setUserImage(image);
    //     }
    //   }
    // }, [session]);
    useEffect(() => {
      if (session?.user) {
        const { name, email, image } = session.user;
        setUserEmail(name??'');
        setUserName(name??'');
        setUserImage(image??'');
      }
    }, [session]);

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
            label:'About Us',
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
          href: '/Settings',
          icon: settings,
      },
      {
          label: 'User',
          href: '/User',
          icon: usericon,
      }
  ];
  const handleNavLinkClick=(href:string)=>{
    router.push(href)
  }



  return (
    <main>
        <nav className='navbar flex justify-between px-8 items-center py-6 bg-green-500 bg-opacity-90'>
          <div className='flex items-center gap-8 justify-between'>
      <section className='flex items-center gap-4 '>
        
        <Image src={menulogo} onClick={()=>setMenu(true)} alt='menu' width={24} height={24} className='text-3x1 cursor-pointer'/>
          
        
            <div className='text-xl text-white bg-opacity-80 font-bold cursor-pointer rounded-full'>
                TheFreshEats
            </div>     
      </section>
      {navLinks.map((link,index)=>(
         <Link key={index} href={link.href} className='hidden lg:block text-gray-600 font-bold hover:text-black'>
              <div onClick={() => handleNavLinkClick(link.href)}>
                
             {link.label}
             </div>
      </Link>
       ))}
       {bottomNavLinks.map((link, index) => (
          <Link key={index} href={link.href} className='hidden lg:block text-gray-600 font-bold hover:text-black'>
              <div onClick={() => handleNavLinkClick(link.href)}>
              {link.label}
              </div>
          </Link>
         ))}                     
      </div>
      {userEmail ? (
            <div className='flex items-center flex-col lg:flex-row lg:items-center font-bold text-xs relative'>
               <span className='mb-2 lg:mb-0 lg:mr-4'>Welcome,{userEmail}</span>
               <div className='relative'>
               <Avatar alt="User Avatar" className='cursor-pointer' src={userImage}onClick={handleAvatarClick} />
               {isLogoutVisible && (
                  <div className="absolute top-full left-0 bg-black p-2 rounded-md shadow-md z-20">
                      <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 w-full'>
                          <Link href="/Cart">
                              MyCart
                          </Link>
                      </button>
                      <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 w-full'>
                          item2
                      </button>
                      <button className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1 w-full'>
                          item3
                      </button>
                      <button onClick={handleLogout} className='text-sm font-bold bg-gray-300 rounded-sm mb-1 px-1'>
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
      <div className={clsx(
        "fixed h-full w-screen lg-hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all z-50",
        isSideMenuOpen && "translate-x-0"
      )}
      >
         <section className='text-black backdrop-blur-sm bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50
         w-56 flex'>
         <IoClose 
           onClick={()=>setMenu(false)}
           className='mt-0 mb-8 text-3xl cursor-pointer'/>
            {/* Render categories button */}
            <button onClick={toggleCategories} className="bg-blue-500 text-white font-bold hover:text-gray-600 rounded">Categories</button>
          {/* Render categories dropdown */}
          {showCategories && (
  <div className="flex flex-col gap-2">
    {/* Map through your basketItems and render category names */}
    {basketItems.map(category => (
      <div key={category.id}>
        <div className="font-bold">
          {/* Add a clickable element for category */}
          <button onClick={() => handleCategoryClick(category.category)}className='bg-blue-400 text-gray font-semibold hover:text-gray-800'>
            {category.category}
          </button>
        </div>
        {/* Check if the current category is the active category */}
        {activeCategory === category.category && (
          <ul className="pl-4">
            {/* Map through category items and render as list */}
            {category.items.map(item => (
              <li key={item.id}>
                 <Link href={`/item/${item.id}`}>
                <button className='bg-blue-500 text-white hover:text-gray-600 rounded py-1 mt-2'>
                  {/* Render item name */}
                  {item.name}
                </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
)}



        
         {navLinks.map((link,index)=>(
         <Link key={index} href={link.href} className='font-bold flex items-center'>
         <div className='mr-2'>
         <Image src={link.icon} alt={link.label} width={24} height={24}/>
             </div>
             {link.label}
      </Link>
       ))}

         <div className='mt-auto'>
         {bottomNavLinks.map((link,index) => (
          <Link key={index} href={link.href} className=' font-bold flex items-center'>
              <div className='mr-2'>
                  <Image src={link.icon} alt={link.label} width={24} height={24} />
              </div>
              {link.label}
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