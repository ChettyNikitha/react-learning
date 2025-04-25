import { useState } from "react";




export  async function handleLogin(email,password, error, setError, navigate){
  let hasError = false;

    if(email.trim()=== "" ){
        setError( (error)=> ({...error,email:"Enter email address"}));
        hasError = true;
    }
    else if(!email.includes('@')){
        setError( (error) => ({...error,email:"Enter valid email address"}));
        hasError = true;
    }
    else{
        setError( (error) => ({...error,email:""}));
    }
    if(password.trim()=== "" ){
        setError( (error) => ({...error,password:"Enter password!"}));
        hasError = true;
    }
    
    else if(password.trim().length<6){
        setError( (error) =>({...error,password:"Password must be atleast 6 characters!"}));
        hasError = true;
    }
    else{
        setError((error) => ({...error,password:""}));
        
    }
    if (hasError) {
      return; // Don't proceed if there are any validation errors
    }
   
   //  Calling Azure Function to store user email
  try {
    const response = await fetch('/api/saveUserData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await response.text();
    console.log("Azure Function response:", result);
    navigate('/home');
  } catch (err) {
    console.error("Error calling Azure Function:", err);
  }

  
}
// controller/Authform_signup_controller.jsx
export async function handleSignup(
  e,
  signupEmail,
  signupPassword,
  confirmPassword,
  setError,
  navigate
) {
  e.preventDefault();

  let hasError = false;

  // Email validation
  if (signupEmail.trim() === "") {
    setError((prev) => ({ ...prev, email: "Enter email address" }));
    hasError = true;
  } else if (!signupEmail.includes("@")) {
    setError((prev) => ({ ...prev, email: "Enter valid email address" }));
    hasError = true;
  } else {
    setError((prev) => ({ ...prev, email: "" }));
  }

  // Password validation
  if (signupPassword.trim() === "") {
    setError((prev) => ({ ...prev, password: "Enter password!" }));
    hasError = true;
  } else if (signupPassword.trim().length < 6) {
    setError((prev) => ({
      ...prev,
      password: "Password must be at least 6 characters!",
    }));
    hasError = true;
  } else if (signupPassword !== confirmPassword) {
    setError((prev) => ({
      ...prev,
      password: "Passwords do not match",
    }));
    hasError = true;
  } else {
    setError((prev) => ({ ...prev, password: "" }));
  }

  if (hasError) return;

  // Signup API call
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    });

    const data = await response.text();
    console.log("Signup response:", data);
    navigate("/home");
  } catch (err) {
    console.error("Signup error:", err);
  }
}
