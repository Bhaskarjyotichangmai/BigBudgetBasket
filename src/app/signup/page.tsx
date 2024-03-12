"use client";
import Link from "next/link";
import React, {useEffect,useRef,useState} from "react";
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

  const [username,setUsername]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!email || !email.length) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || !password.length) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password length should be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword || !confirmPassword.length) {
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

  const handleSignup = () => {
    if (validateForm()) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      router.push("/home");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className="flex flex-col md:flex-row min-h-screen">
        <section className="flex-1 flex items-center justify-center relative md:item-start">
          <div className="p-6 md:p-12 rounded-lg shadow-xl w-full max-w-lg bg-rgb(129, 140, 248) absolute right-50%">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for your account!</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Enter Email
                  </label>
                  <div className="mt-1">
                    <TextField
                      id="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="Email"
                      error={emailError.length > 0}
                      helperText={emailError}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Create Password
                  </label>
                  <div className="mt-1">
                    <TextField
                      id="password"
                      name="password"
                      required
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      type="password"
                      placeholder="Create password"
                      error={passwordError.length > 0}
                      helperText={passwordError}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="confirm-password"
                      type="password"
                      placeholder="Confirm password"
                      required
                      error={confirmPasswordError.length > 0}
                      helperText={confirmPasswordError}
                    />
                  </div>
                </div>

                <div className="mt-4 text-sm flex items-center justify-between">
                  Already have an account?{' '}
                  <Link href="/login" passHref>
                    <span className="cursor-pointer font-semibold leading-5 text-indigo-600 hover:text-indigo-400">Login</span>
                  </Link>
                  </div>
                <div>
                  <button
                    onClick={handleSignup}
                    type="button"
                    className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="mt-4 text-xl flex items-center justify-center text-gray-800">Or</div>
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                  >
                    Sign Up with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}
