"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TextField,ThemeProvider, createTheme } from "@mui/material";

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


export default function SignupPage() {
    const router = useRouter();
    
    const [emailError,setEmailError]=React.useState("");
    const [passwordError,setPasswordError]=React.useState("");
    const [confirmPasswordError,setConfirmPasswordError]=React.useState("");

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        confirmPassword:""
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setUser({...user, [name]: value});
    };

    const onSignup = async () => {
        try {
            setLoading(true);
            
            if(!user.email||!user.email.length){
                console.log('Email is empty');
                setEmailError('Email is required');
                return;
                
            } else{
                setEmailError('');
            }
            
            if(!user.password||!user.password.length){
                console.log('Password is empty')
                setPasswordError('Password is required');
                return;
            }
            else if (user.password.length < 8) {
                console.log('Password length should be atleast 8 characters');
                setPasswordError('Password length should be at least 8 characters');
                return;
            }
            else{
                setPasswordError('')
            }
            if(!user.confirmPassword||!user.confirmPassword.length){
                console.log('Confirmation of Password is empty')
                setConfirmPasswordError('Confirmation of Password is required'); 
                return;    
            }else{
                setConfirmPasswordError('')
            }
            if (user.password!==user.confirmPassword){
                setConfirmPasswordError('Passwords do not match');
                return;
            }
            else{
                setConfirmPasswordError('');
            }
            
            
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup success");
            router.push("/login");
            
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
        
    }
    const onSignupWithGoogle=async()=>{
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
        

    <section className='flex-1 flex items-center justify-center relative md:item-start'>
        <div className='p-6 md:p-12 rounded-lg shadow-xl w-full max-w-lg bg-rgb(129, 140, 248) absolute right-50%'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2x1 font-bold leading-9 tracking-tight text-gray-900'>
                    Sign up your account!
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className="space-y-6" onSubmit={onSignup}>
                    <div>
                        <label htmlFor='email' className='block-text-sm font-medium leading-6 text-gray-900'>
                            Enter Email
                        </label>
                        <label>
                        <div className='mt-1'> 
                            <TextField
                                error={emailError && emailError.length?true:false}
                                id='email'
                                fullWidth
                                name='email'
                                value={user.email}
                                onChange={(f)=>setUser({...user,email:f.target.value})}
                                autoComplete='email'
                                type='email'
                                required
                                placeholder='Email'
                                helperText={emailError}
                                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </label>
                    </div>
                    <div>
                        <div className=''>
                            <label  htmlFor='password' className='block-text-sm font-medium leading-6 text-gray-900'>
                                Create Password
                            </label>
                            <label>   
                            <div className='mt-1'>
                                <TextField
                                   id='password'
                                   name='password'
                                   required
                                   error={passwordError && passwordError.length?true:false}
                                   fullWidth
                                   value={user.password}
                                   onChange={(f)=>setUser({...user,password:f.target.value})}
                                   autoComplete='current-password'
                                   type='password'
                                   placeholder='Create password'
                                   helperText={passwordError}
                                   className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                   />
                                </div>
                                
                                <div>
                            <div className=''>
                                <label htmlFor='confirmPassword' className='block-text-sm font-medium leading-6 text-gray-900'>
                                    Confirm Password
                                </label>
                                <div className='mt-1'>
                                    <TextField
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        fullWidth
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete='confirm-password'
                                        type='password'
                                        placeholder='Confirm password'
                                        required
                                        error={confirmPasswordError && confirmPasswordError.length?true:false}
                                        helperText={confirmPasswordError}
                                        className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-insert ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insert focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    />
                                </div>
                            </div>                              
                        </div>

                                <div className='mt-4 text-sm flex items-center justify-between '>
                                Already have an account?
                                <Link href='/login' passHref={true} legacyBehavior={true}>
                                    <span className='cursor-pointer font-semibold leading-5 text-indigo-600 hover:text-indigo-400 '> 
                                   Login
                                   </span>
                                {/* </a> */}
                               </Link>
                            </div>
                            </label>
                        </div>                              
                    </div>
                    <div>
                        <button 
                                onClick={onSignup}
                                type="submit"
                                className="flex w-full justify-center rounded-mg bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            SignUp
                        </button>
                    </div>
                    <div className="mt-4 text-xl flex items-center justify-center text-gray-800">
                        Or
                    </div>
                    <div>
                    <button
                      onClick={onSignupWithGoogle}
                      type="button"
                      className="flex w-full justify-center rounded-mg bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                    >
                      SignUp with Google
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