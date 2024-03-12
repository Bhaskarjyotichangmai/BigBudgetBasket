"use client";
import Link from "next/link";
import React, {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TextField,ThemeProvider, createTheme } from "@mui/material";
import SignupPage from "../signup/page";

const theme = createTheme({
    palette: {
      primary: {
        main: "#858585", 
      },
      secondary: {
        main: "#757575", 
      },
    },
  });


export default function LoginPage() {
    const router = useRouter();

    const [emailError,setEmailError]=React.useState("");
    const [passwordError,setPasswordError]=React.useState("");

    const [user, setUser] = React.useState({
        email: "",
        password: "",   
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (storedEmail && storedPassword) {
            setUser({
                email: storedEmail,
                password: storedPassword,
            });
        }
    }, []);

    const onLogin = async (formData:any) => {
        try {
            setLoading(true);
            if(!user.email||!user.email.length){
                console.log('Email is empty');
                setEmailError('Email is required');
                
            } else{
                setEmailError('');
            }
            
            if(!user.password||!user.password.length){
                console.log('Password is empty')
                setPasswordError('Password is required');
                
            }else{
                setPasswordError('')
            }
            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");
            // return true;
            // const response = await axios.post("/api/users/login", user);
            // console.log("Login success", response.data);
            // toast.success("Login success");
            // router.push("/profile");
            if (
                storedEmail === user.email &&
                storedPassword === user.password
              ) {
                console.log("Login success");
                toast.success("Login success");
                router.push("/home");
              } else {
                console.log("Invalid email or password");
                toast.error("Invalid email or password");
              }
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }
    const onLoginWithGoogle=async()=>{
        console.log('Login with Google');
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]); 

    return (
    <ThemeProvider theme={theme}>
    <main className='flex flex-col md:flex-row min-h-screen'>
        <h1>{loading ? "Processing" : ""}</h1>
        <hr/>

    <section className='flex-1 flex items-center justify-center relative md:item-start'>
        <div className='p-6 md:p-12 rounded-lg shadow-xl w-full max-w-lg bg-rgb(129, 140, 248) absolute right-50%'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2x1 font-bold leading-9 tracking-tight text-gray-900'>
                    Sign in to your account!
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className="space-y-6 action='#"method="POST">
                    <div>
                        <label htmlFor='email' className='block-text-sm font-medium leading-6 text-gray-900'>
                            User Id
                        </label>
                        <label>
                        <div className='mt-1'> 
                            <TextField
                                id='email'
                                error={emailError && emailError.length?true:false}
                                name='email'
                                value={user.email}
                                onChange={(f)=>setUser({...user,email:f.target.value})}
                                autoComplete='email'
                                type='email'
                                required
                                helperText={emailError}
                                placeholder='Enter User Id'
                                className=' w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </label>
                    </div>
                    <div>
                        <div className=''>
                            <label  htmlFor='password' className='block-text-sm font-medium leading-6 text-gray-900'>
                                Password
                            </label>
                            <label>   
                            <div className='mt-1'>
                                <TextField
                                   id='password'
                                   error={passwordError && passwordError.length?true:false}
                                   name='password'
                                   value={user.password}
                                   onChange={(f)=>setUser({...user,password:f.target.value})}
                                   autoComplete='current-password'
                                   type='password'
                                   placeholder='Enter password'
                                   helperText={passwordError}
                                   required
                                   className=' w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                   />
                                </div>
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-400">
                                    Forgot Password?</a>
                                <div className='mt-4 text-sm flex items-center justify-between '>
                                Don't have an account?
                                <Link href='/signup' passHref={true} legacyBehavior={true}>
                                    <span className='cursor-pointer font-semibold leading-5 text-indigo-600 hover:text-indigo-400 '> 
                                   Signup
                                   </span>
                                {/* </a> */}
                               </Link>
                            </div>
                            </label>
                        </div>                              
                    </div>
                    <div>
                        <button 
                                onClick={onLogin}
                                type="submit"
                                className="flex w-full justify-center rounded-mg bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-xl flex items-center justify-center text-gray-800">
                        Or
                    </div>
                    <div>
                    <button
                      onClick={onLoginWithGoogle}
                      type="button"
                      className="flex w-full justify-center rounded-mg bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                    >
                      Login with Google
                    </button>
                  </div>
                </form>
            </div>
        </div>
    </section>
</main>
</ThemeProvider>
    )

}
