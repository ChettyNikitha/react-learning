import React, { useState } from "react";


//AuthForm is a function component that holds a Login /signup Form 
export default function AuthForm(){
    //using usestate hooks to create a Single page application that only changes the Login/Signup Forms without reloading the entire page 
    //here isLogin is a value of current sate , setIsLogin is the value to update the state
    //initially we are setting isLogin state value to be true , so Form opens up with isLogin state 
    const[isLogin, setIsLogin] = useState(true);

    return(
        
        //creating a container of div to hold Form
        <div className="welcome" > <h1>Personal Budget</h1>
        <div className="welcome_text">Save while you Spend!</div>
       
        <div className='container'>
            {/* creating a sign in Form with  */}
            <div className="form-container">
                <div className="form-toggle">
                    {/* when writing the javascript in react html tage we use {}
                    if the islogin is true then active classname is taken 
                    on clicking on Login SetIslogin value should be true so usestate is considered as Login state ,if false signup form*/}
                    <button className= {isLogin ? 'active' : " "} onClick={() => setIsLogin(true)}
                    >Login</button>
                    <button className={!isLogin ? 'active' : " "} onClick={() => setIsLogin(false)}
                    >Sign UP</button>
                </div>
                {/* if the usestate is ISlogin then login form should be shown  or else SignUp form we do this using if else (:)*/}
                {isLogin ? <>
                <div className="form">
                    <h2 >Login Form</h2>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password" />
                    <a href="#">Forgot Password?</a>
                    <button>Login</button>
                    {/* if don't have a account then user uses sign up form to create , so usestate islogin should be false */}
                    <p>Not a Member?
                        <a href="#" onClick={()=>setIsLogin(false)}>SignUp now</a>
                    </p>

                    
                    
                    </div>
                    </> : <>
                    <div className="form">
                        <h2>SignUP Form</h2>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                        <button>SignUp</button>

                    </div>
                    </>}
            </div>

        </div>
        </div>
        
        
    )
}