"use client";
import Link from "next/link";
import React, {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TextField,ThemeProvider, createTheme,Grid,Button,Typography,Box } from "@mui/material";
import backgroundimg from '../Assets/backgroundimg.svg'
import background from '../Dashboard/Components/Background'
import Background from "../Dashboard/Components/Background";
import { useSession, getSession } from 'next-auth/react';


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

    const [loginMessage, setLoginMessage] = React.useState("");
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedUsername=localStorage.getItem("username");

        if (storedEmail && storedPassword) {
            setUser({
                email: storedEmail,
                password: storedPassword,
            });
        }
    }, []);

    const onLogin = async () => {
      try {
        setLoading(true);
    
        
        setEmailError('');
        setPasswordError('');
    
       
        if (!user.email || !user.email.length) {
          setEmailError('Email is required');
          return; 
        }
        if (!user.password || !user.password.length) {
          setPasswordError('Password is required');
          return; 
        }
    
        
        const response = await axios.post('http://localhost:5004/api/login', {
          email: user.email,
          password: user.password,
        });
    
        
        if (response.status === 200 && response.data && response.data.msg === 'Login successful') {
          console.log("Login success");
          setLoginMessage("Logged in succesfully!");
          toast.success("Login success");

          localStorage.setItem("email", user.email);
          localStorage.setItem("password", user.password);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("token", response.data.token);

          router.push("/Dashboard");
        } else {
          console.log("Invalid email or password");
          toast.error("Invalid email or password");
          setLoginMessage("Incorrect email or password");
        }
      } catch (error:any) {
        console.log("Login failed", error);
        toast.error("Login failed. Please try again.");
        setLoginMessage("Error logging in. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    // const onLoginWithGoogle=async()=>{
    //   const newWindow = window.open("http://localhost:5004/auth/google/callback","_self")
    //       window.addEventListener('message', (event) => {
    //     if (event.origin !== window.location.origin) return;
        
    //     const { googleEmail, googleUserName, image, googleId } = event.data;
        
    //     // Update localStorage
    //     localStorage.setItem('googleEmail', googleEmail);
    //     localStorage.setItem('googleUsername', googleUserName);
    //     localStorage.setItem('image', image);
    //     localStorage.setItem('googleId', googleId);
        
    //     // Close the popup window
    //     newWindow?.close();
    //     // Redirect or perform any other action
    //     router.push('/Dashboard');
    // }, false);
    // }
    const onLoginWithGoogle = async () => {
      const newWindow = window.open("http://localhost:5004/auth/google/callback", "_self");
      
      const handleEvent = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
  
          const { googleEmail, googleUserName, image, googleId } = event.data;
  
          // Update localStorage
          localStorage.setItem('googleEmail', googleEmail);
          localStorage.setItem('googleUsername', googleUserName);
          localStorage.setItem('image', image);
          localStorage.setItem('googleId', googleId);
  
          // Fetch updated session
          const session = await getSession();
          
          // Redirect or perform any other action
          router.push('/Dashboard');
      };
  
      window.addEventListener('message', handleEvent, false);
  }
  
    const onLoginWithMobile=async()=>{
        console.log('Check Otp');
    }
    const forgotPassword=async()=>{
        router.push("/ForgotPassword")
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
        <Grid container spacing={0} alignItems="center" justifyContent="flex-end" style={{ position: 'relative', zIndex: 2,minHeight: '100vh'  }}>
          <Background />
          <Grid item xs={12} sm={6} md={5} lg={4} justifyContent="center" alignItems="center">
            <div className="p-6 md:p-12 rounded-lg shadow-xl bg-gray-100">
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center" style={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h4" gutterBottom style={{color:"blue",fontWeight:"bold"}}>
                    Welcome back!
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{color:"blue"}}>
                    Sign in with Email or Mobile
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email Id"
                    placeholder="Enter email id"
                    fullWidth
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    autoComplete="email"
                    type="email"
                    required
                    error={!!emailError}
                    helperText={emailError}
                    InputLabelProps={{ style: { color: 'blue' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    fullWidth
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    autoComplete="current-password"
                    type="password"
                    required
                    error={!!passwordError}
                    helperText={passwordError}
                    InputLabelProps={{ style: { color: 'blue' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={onLogin}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ backgroundColor: "blue" }}
                  >
                    Login
                  </Button>
                </Grid>
                <Typography variant="body2" align="center" gutterBottom style={{ position: 'relative', zIndex:2,color:'blue',marginTop:'20px',cursor:'pointer'}}onClick={forgotPassword}>
                    Forgot password?
                </Typography>
 <Grid item xs={12} style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
  {loginMessage &&(
     <Box
     bgcolor={loginMessage==="Logged in succesfully!" ? 'green' : 'red'}
     color="white"
     p={2}
     borderRadius={4}
     boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" 
   >
     <Typography variant="body1">{loginMessage}</Typography>
   </Box>
 )}
</Grid>
                <Grid item xs={12} style={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="body2" align="center" gutterBottom>
                    Don't have an account?{' '}
                    <Link href='/signup' passHref>
                      <span className='cursor-pointer font-bold leading-5 text-indigo-600 hover:text-indigo-400'>Signup</span>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={onLoginWithMobile}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ backgroundColor: "gray" }}
                  >
                    Login with Mobile OTP
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={onLoginWithGoogle}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ backgroundColor: "red" }}
                  >
                    Login with Google
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    )

}