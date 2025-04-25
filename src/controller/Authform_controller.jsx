import { useState } from "react";




export default async function handleLogin(email,password, error, setError, navigate){
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
