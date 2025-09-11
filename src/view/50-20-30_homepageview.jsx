
import React from "react";
import pieimage from "../assets/chart-50-30-20-budget.jpg";
import "../FiftyTwentyThirtyPage.css"
export default function FiftyTwentyThirtyPage() {
  return (
    <div
      className="fifty-page"
      style={{ backgroundImage: `url(${pieimage})` }}
    >
      <div className="page-container">
       <h1 className="page-heading">50/20/30 Budget Strategy</h1>
       
       <div className="fifty-description">
  <p>
    The <strong>50-20-30 rule</strong> is a simple budgeting strategy: 
    spend <strong>50%</strong> on needs, <strong>20%</strong> on savings, 
    and <strong>30%</strong> on wants. It helps you manage money 
    without complicated calculations.
  </p>
</div>
    </div>
    </div>
    
  );
}