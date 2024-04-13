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
// import SigninButton from "../Dashboard/Components/SigninButton";
import { signIn, signOut, useSession } from 'next-auth/react' 

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
    const { data: session } = useSession();
    // if (session) {
    //   // If user session exists, redirect to the dashboard
    //   router.push('/Dashboard');
    // }

    const handleLogin = async (method:any) => {
      try {
          setLoading(true);
          setEmailError('');
          setPasswordError('');
          setLoginMessage('');
  
          switch (method) {
              case 'email':
                  if (!user.email || !user.email.length) {
                      setEmailError('Email is required');
                      return;
                  }
                  if (!user.password || !user.password.length) {
                      setPasswordError('Password is required');
                      return;
                  }
                  
                  const emailResponse = await axios.post('http://localhost:5004/api/login', {
                      email: user.email,
                      password: user.password,
                  });
                  
                  if (emailResponse.status === 200 && emailResponse.data && emailResponse.data.msg === 'Login successful') {
                      setLoginMessage("Logged in successfully!");
                      localStorage.setItem("email", user.email);
                      localStorage.setItem("password", user.password);
                      localStorage.setItem("username", emailResponse.data.user.username);
                      localStorage.setItem("token", emailResponse.data.token);
                      router.push("/Dashboard");
                  } else {
                      toast.error("Invalid email or password");
                      setLoginMessage("Incorrect email or password");
                  }
                  break;
  
              case 'google':
                  const storedEmail = localStorage.getItem("email");
                  const storedName = localStorage.getItem("name");
                  const storedImage = localStorage.getItem("image");
  
                  await signIn('google', { callbackUrl: 'http://localhost:3000/Dashboard' });
                  
                  const googleResponse = await axios.post('http://localhost:5004/api/google-login', {
                      email: storedEmail,
                      name: storedName,
                      image: storedImage,
                  });
  
                  if (googleResponse.status === 200 && googleResponse.data && googleResponse.data.msg === 'Login successful') {
                      setLoginMessage("Logged in with Google successfully!");
                      localStorage.setItem("email", googleResponse.data.email);
                      router.push("/Dashboard");
                  } else {
                      toast.error("Login with Google failed");
                  }
                  break;
  
              case 'mobile':
                  // Your mobile login logic here
                  console.log('Check OTP');
                  break;
  
              default:
                  break;
          }
      } catch (error) {
          console.error('Login failed', error);
          toast.error("Error logging in. Please try again.");
          setLoginMessage("Error logging in. Please try again.");
      } finally {
          setLoading(false);
      }
  };
    useEffect(() => {
      // Check if user session exists
      if (session?.user) {
        const { email, name, image } = session.user;
        localStorage.setItem("email", email ?? "");
        localStorage.setItem("name", name ?? "");
        localStorage.setItem("image", image ?? "");
        router.push('/Dashboard');
      }
    }, [session]);
  

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

    // const onLogin = async () => {
    //   try {
    //     setLoading(true);
    
        
    //     setEmailError('');
    //     setPasswordError('');
    
       
    //     if (!user.email || !user.email.length) {
    //       setEmailError('Email is required');
    //       return; 
    //     }
    //     if (!user.password || !user.password.length) {
    //       setPasswordError('Password is required');
    //       return; 
    //     }
    
        
    //     const response = await axios.post('http://localhost:5004/api/login', {
    //       email: user.email,
    //       password: user.password,
    //     });
    
        
    //     if (response.status === 200 && response.data && response.data.msg === 'Login successful') {
    //       console.log("Login success");
    //       setLoginMessage("Logged in succesfully!");
    //       toast.success("Login success");

    //       localStorage.setItem("email", user.email);
    //       localStorage.setItem("password", user.password);
    //       localStorage.setItem("username", response.data.user.username);
    //       localStorage.setItem("token", response.data.token);
          

    //       router.push("/Dashboard");
    //     } else {
    //       console.log("Invalid email or password");
    //       toast.error("Invalid email or password");
    //       setLoginMessage("Incorrect email or password");
    //     }
    //   } catch (error:any) {
    //     console.log("Login failed", error);
    //     toast.error("Login failed. Please try again.");
    //     setLoginMessage("Error logging in. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    
    // const onLoginWithGoogle=async()=>{
    //   try {
    //     // const response = await axios.get("http://localhost:5004/auth/google/callback");   
    //     // window.location.href = response.data.authUrl;
    //     <SigninButton />
    // } catch (error) {
    //     console.error('Error logging in with Google:', error);
    //     toast.error("Error logging in with Google. Please try again.");
    // }
    // }
  //   const onLoginWithGoogle = async () => {
  //     try {
  //         // Initiate Google OAuth login using next-auth signIn function
  //         await signIn('google', { callbackUrl: 'http://localhost:3000/Dashboard' });
  //     } catch (error) {
  //         console.error('Error logging in with Google:', error);
  //         toast.error("Error logging in with Google. Please try again.");
  //     }
  // }

  // const onLoginWithGoogle = async () => {
  //   try {
  //     const storedEmail = localStorage.getItem("email");
  //   const storedName = localStorage.getItem("name");
  //   const storedImage = localStorage.getItem("image");
  //     // Initiate Google OAuth login using next-auth signIn function
  //     await signIn('google', { callbackUrl: 'http://localhost:3000/Dashboard' });
  //     // Send the session data to your backend API
  //   const response = await axios.post('http://localhost:5004/api/google-login', {
  //     email: storedEmail,
  //     name: storedName,
  //     image: storedImage,
  //   });

  //   if (response.status === 200 && response.data && response.data.msg === 'Login successful') {
  //     console.log("Google Login success");
  //     setLoginMessage("Logged in with Google successfully!");
  //     toast.success("Login with Google success");

  //     localStorage.setItem("token", response.data.token);
  //   } else {
  //     console.log("Google Login failed");
  //     toast.error("Login with Google failed");
  //   }
  // } catch (error) {
  //     console.error('Error logging in with Google:', error);
  //     toast.error("Error logging in with Google. Please try again.");
  //   }
  // }
  
  //   const onLoginWithMobile=async()=>{
  //       console.log('Check Otp');
  //   }
  const onLogin = () => {
    handleLogin('email');
};

const onLoginWithGoogle = () => {
    handleLogin('google');
};

const onLoginWithMobile = () => {
    handleLogin('mobile');
};
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
                    // onClick={() => signIn('google')}
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
