import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import {handleLogin,handleSignup} from "./controller/Authform_controller.jsx";
import './AuthForm.css';



//AuthForm is a function component that holds a Login /signup Form 
export default function AuthForm() {
    //using usestate hooks to create a Single page application that only changes the Login/Signup Forms without reloading the entire page 
    //here isLogin is a value of current sate , setIsLogin is the value to update the state
    //initially we are setting isLogin state value to be true , so Form opens up with isLogin state 
    const [isLogin, setIsLogin] = useState(true);
    //using usestate to get data from form . controlled data handle
    const [email, setEmail] = useState('');
    //using UseRef uncontrolled data handle way
    const [password, setPassword] = useState('');
    //adding usestate for signup form data variables we are using this sepeartely from above usestate bcuz to keep clear of data in each login n signup form
    const [signupEmail, setSignupEmail] = useState('');
   const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const [error,setError] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password, error, setError , navigate); // Passing setError as a prop
        console.log("email:", email);
    console.log("pwd:", password);
      };
      document.body.style.backgroundColor = "cornflowerblue";
      
      

    return (
      
        //creating a container of div to hold Form
        <div className="loginpage">
        <div className="welcome" > <h1>Personal Budget</h1>
            <div className="welcome_text">Save while you Spend!</div>

            <div className='container'>
                {/* creating a sign in Form with  */}
                <div className="form-container">
                    <div className="form-toggle">
                        {/* when writing the javascript in react html tage we use {}
                    if the islogin is true then active classname is taken 
                    on clicking on Login SetIslogin value should be true so usestate is considered as Login state ,if false signup form*/}
                        <button className={isLogin ? 'active' : " "} onClick={() => setIsLogin(true)}
                        >Login</button>
                        <button className={!isLogin ? 'active' : " "} onClick={() => setIsLogin(false)}
                        >Sign UP</button>
                    </div>
                    {/* if the usestate is ISlogin then login form should be shown  or else SignUp form we do this using if else (:)*/}
                    {
                        isLogin ? <>
                            {/* Login form */}
                            <div className="form">
                                <h2 >Login Form</h2>
                                <input type="email" placeholder="Email" value={email}
                                    // when the email value is chnaged onchanged event is called and saves value to 'e' and then stores it as setemail
                                    onChange={(e) => { setEmail(e.target.value) }} />
                                    {/* if there are any errors related to email property then show that email error */}
                                    {error.email && <span className="errors_font">{error.email}</span>}
                                <input type="password" placeholder="Password" value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                    {error.password && <span className="errors_font" >{error.password}</span>}
                                <a href="#">Forgot Password?</a>
                                {/* on clicking on login button show  */}
                                <button onClick={handleSubmit}> 
                                    
                                     
                                    Login</button>
                                {/* if don't have a account then user uses sign up form to create , so usestate islogin should be false */}
                                <p>Not a Member?
                                    <a href="#" onClick={() => setIsLogin(false)}>SignUp now</a>
                                </p>



                            </div>
                            {/* signup form */}
                        </> : <>
                            <div className="form">
                                <h2>SignUP Form</h2>
                                <input
  type="email"
  placeholder="Email"
  value={signupEmail}
  onChange={(e) => setSignupEmail(e.target.value)}
/>
{/* if there are any errors related to email property then show that email error */}
{error.email && <span className="errors_font">{error.email}</span>}
<input
  type="password"
  placeholder="Password"
  value={signupPassword}
  onChange={(e) => setSignupPassword(e.target.value)}
   
/>
{error.password && <span className="errors_font" >{error.password}</span>}

<input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
{error.password && <span className="errors_font" >{error.password}</span>}
<button onClick={(e) => handleSignup(e, signupEmail, signupPassword, confirmPassword, setError, navigate)}>
  Sign Up
</button>

                            </div>
                        </>}
                </div>

            </div>
        </div>
        
        </div>
        


    )
}