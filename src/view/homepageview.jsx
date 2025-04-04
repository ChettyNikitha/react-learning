
import React from "react";
import '../homepage.css';
import BudgetStrategySelectionCards from "../model/homepage_model.jsx";

export default function Homepageview(){
    document.body.style.backgroundColor="white";
    return(
  
   <div className="homepage">
    <div className="homepagetitle">
    <h1 > Select Your Budget Strategy</h1></div>
    <div className="subtitle">
    <h3 >Planned approach to managing income and expenses to achieve Your financial goals💰💵</h3>
    </div>
    <BudgetStrategySelectionCards/>
   </div>

    );
}