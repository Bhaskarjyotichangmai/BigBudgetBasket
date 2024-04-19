"use client";
import Link from "next/link";
import React, {useEffect,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TextField,ThemeProvider, Grid,Button,createTheme,Typography,Box } from "@mui/material";
import Image from "next/image";
import Background from "../Dashboard/Components/Background";
import { red } from "@mui/material/colors";
import { Poppins } from "next/font/google";
import { Error } from "mongoose";
import { signIn, signOut, useSession,getSession } from 'next-auth/react' 

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
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  });
  const { username, email, password, confirmPassword, mobile } = formData;
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError,setUsernameError]=useState("");
  const [mobileError,setMobileError]=useState("");
  
  const [signupMessage, setSignupMessage] = React.useState('');
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  const validateForm = () => {
    let isValid = true;
    if (!formData.username || !formData.username.length) {
      setUsernameError("Username cannot be empty");
      isValid = false;
    } else {
      setUsernameError("");
    }
    
    if (!formData.mobile || !formData.mobile.length) {
      setMobileError("Mobile number is required");
      isValid = false;
    } else {
      setMobileError ("");
    }


    if (!formData.email || !formData.email.length) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.password || !formData.password.length) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password length should be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }


    if (!formData.confirmPassword || !formData.confirmPassword.length) {
      setConfirmPasswordError("Confirmation of Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };


  const handleSignup = async() => {
  try{
    if (validateForm()) {
      if (mobile.length !== 10) {
        setMobileError("Mobile number must be exactly 10 digits");
      } else {
        setMobileError("");
     
        const response = await axios.post('http://localhost:5004/api/signup', {
          userName: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          mobile: formData.mobile
      });
      console.log(response.data);
      
      setSignupMessage("Signup successful!");

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("username",username);
      localStorage.setItem("mobile number",mobile);
      localStorage.setItem("confirmed Password",confirmPassword);
      localStorage.setItem("token", response.data.token);
      router.push("/Dashboard");
      }
    }
  }catch (error:any) {
if (error.response && error.response.data && error.response.data.msg) {
  const errorMsg = error.response.data.msg;
  if (error.response.status === 400) {
    if (errorMsg === 'User already exists with this email') {
      setEmailError(errorMsg);
    } else if (errorMsg === 'User already exists with this username') {
      setUsernameError(errorMsg);
    } else if (errorMsg === 'User already exists with this mobile number') {
      setMobileError(errorMsg);
    } else {
      console.error("Error signing up:", errorMsg);
    }
  } else {
    console.error("Error signing up:", errorMsg);
  }
} else {
  console.error("Error signing up:", error);
}
}
};
const handleGoogleSignup=async()=>{
  window.open("http://localhost:5004/auth/google/callback","_self")
}
// const handleGoogleSignup = async () => {
//   try {
//     await signIn('google', { callbackUrl: 'http://localhost:3000/Dashboard' });

//     const sessionData = await getSession();

//     if (sessionData?.user) {
//       const { email, name, image } = sessionData.user;
//       const googleId = (sessionData.user as any).id; 

//       const googleResponse = await axios.post('http://localhost:5004/api/google-login', {
//         email:email??'',
//         name:name??'',
//         image:image??'',
//         googleId: googleId ??'',
//       });

//       if (googleResponse.status === 200 && googleResponse.data && googleResponse.data.msg === 'Login successful') {
//         setSignupMessage("Signed up with Google successfully!");
//         localStorage.setItem("email", email??'');
//         localStorage.setItem("username", name??'');
//         localStorage.setItem("image", image??'');
//         localStorage.setItem("googleId", googleId ?? '');
//         router.push("/Dashboard");
//       } else {
//         toast.error("Signup with Google failed");
//       }
//     }
//   } catch (error) {
//     console.error("Error signing up with Google:", error);
//   }
// };

// useEffect(() => {
//   const fetchSessionData = async () => {
//     try {
//       const sessionData = await getSession();

//       if (sessionData?.user) {
//         const { email, name, image } = sessionData.user;
//         const googleId = (sessionData.user as any).id;

//         localStorage.setItem("email", email ?? "");
//         localStorage.setItem("username", name ?? "");
//         localStorage.setItem("image", image ?? "");
//         localStorage.setItem("googleId", googleId ?? "");
//         router.push('/Dashboard');
//       }
//     } catch (error) {
//       console.error("Error fetching session data:", error);
//     }
//   };

//   fetchSessionData();
// }, [session]);

  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={3} alignItems="center" justifyContent="flex-end" style={{ position: 'relative', zIndex: 2}}>
      <Background />
      <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center" alignItems="center" >
        <div className="p-6 md:p-12 rounded-lg shadow-xl bg-gray-100">
          <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center"style={{ position: 'relative', zIndex: 2 }}>
  <Typography variant="h4" gutterBottom style={{color:"blue",fontWeight:"bold"}}>
    Welcome to FreshEats!
  </Typography>
  <Typography variant="h5" gutterBottom style={{color:"blue"}}>
    Signup with your mobile or email
  </Typography>
</Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                label="Enter User Name"
                placeholder="Enter username"
                fullWidth
                value={username}
                onChange={(e) =>  setFormData({ ...formData, username: e.target.value })}
                autoComplete="username"
                required
                error={!!usernameError}
                helperText={usernameError}
                InputLabelProps={{ style: { color: 'blue' } }}
                InputProps={{
                  style: { borderColor: '#000002' }, 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="mobile"
                label="Enter Mobile Number"
                placeholder="Enter  mobile number"
                fullWidth
                value={mobile}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  const numericValue = enteredValue.replace(/\D/g, '');
                  const trimmedValue = numericValue.slice(0, 10);
                  setFormData({ ...formData, mobile: trimmedValue });
                  if (trimmedValue.length === 10) {
                    setMobileError(""); 
                  } else {
                    setMobileError("Mobile number must be exactly 10 digits"); // Show error message
                  }
                }}
                autoComplete="Mobile number"
                type="tel"
                required
                error={!!mobileError}
                helperText={mobileError}
                InputLabelProps={{ style: { color: 'blue' } }}
                inputProps={{
                  pattern: "[0-9]{10}", 
                  inputMode: "numeric" 
                }}
                InputProps={{
                  style: { borderColor: '#000002' }, 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Enter Email"
                placeholder="Enter email id"
                fullWidth
                value={email}
                onChange={(e)=>{ const enteredValue = e.target.value;
                  const trimmedValue = enteredValue.trim();
                  setFormData({ ...formData, email: trimmedValue }); 
                  if (/^\S+@\S+\.\S+$/.test(trimmedValue)) {
                    
                    setEmailError(""); 
                  } else {
                    setEmailError("Invalid email format"); 
                  }
                }}
                autoComplete="email"
                type="email"
                required
                error={!!emailError}
                helperText={emailError}
                InputLabelProps={{ style: { color: 'blue' } }}
                InputProps={{
                  style: { borderColor: '#000002' }, 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Create Password"
                placeholder="Enter password"
                fullWidth
                value={password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
                type="password"
                required
                error={!!passwordError}
                helperText={passwordError}
                InputLabelProps={{ style: { color: 'blue' } }}
                InputProps={{
                  style: { borderColor: '#000002' }, 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Reenter your password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                autoComplete="confirm-password"
                type="password"
                required
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputLabelProps={{ style: { color: 'blue' } }}
                InputProps={{
                  style: { borderColor: '#000002' }, 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSignup}
                variant="contained"
                color="primary"
                fullWidth
                style={{backgroundColor:"blue"}}
              >
                Sign Up
              </Button>
            </Grid>
            {/* <h1>{loading?"Processing":"Signup"}</h1> */}
            <Grid item xs={12}>
              <Button
                onClick={handleGoogleSignup}
                variant="contained"
                color="secondary"
                fullWidth
                style={{backgroundColor:"red"}}
              >
                Sign Up with Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{backgroundColor:"gray"}}
              >
                Sign Up with Mobile OTP
              </Button>
            </Grid>
            <Grid item xs={12} style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
  {signupMessage &&(
     <Box
     bgcolor={signupMessage==="Signup successful!" ? 'green' : 'red'}
     color="white"
     p={2}
     borderRadius={4}
     boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" 
   >
     <Typography variant="body1">{signupMessage}</Typography>
   </Box>
 )}
</Grid>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="body2" align="center" gutterBottom>
                Already have an account?{' '}
                <Link href="/login" passHref>
                  <span className="cursor-pointer font-semibold leading-5 text-indigo-600 hover:text-indigo-400">Login</span>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}
