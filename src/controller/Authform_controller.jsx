import { useState } from "react";




export default function handleLogin(email,password, error, setError, navigate){
    

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
        navigate('/home');
    }

}