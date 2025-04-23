import { useState } from "react";




export default async function handleLogin(email,password, error, setError, navigate){
    

    if(email.trim()=== "" ){
        setError( (error)=> ({...error,email:"Enter email address"}));
    }
    else if(!email.includes('@')){
        setError( (error) => ({...error,email:"Enter valid email address"}));
    }
    else{
        setError( (error) => ({...error,email:""}));
    }
    if(password.trim()=== "" ){
        setError( (error) => ({...error,password:"Enter password!"}));
    }
    
    else if(password.trim().length<6){
        setError( (error) =>({...error,password:"Password must be atleast 6 characters!"}));
    }
    else{
        setError((error) => ({...error,password:""}));
        
    }
    navigate('/home');
   // ✅ Call Azure Function to store user email
  try {
    const response = await fetch('/api/saveUserData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await response.text();
    console.log("Azure Function response:", result);
  } catch (err) {
    console.error("Error calling Azure Function:", err);
  }

  
}