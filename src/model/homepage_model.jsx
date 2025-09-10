
import { useState } from "react";
import pieimage from '../assets/chart-50-30-20-budget.jpg';
import yourselfimage from '../assets/yourfirst.png';
import zeroimage from '../assets/zerobudgetimage.png';
import ownimage from '../assets/ownimage.jpg';
import { useNavigate } from "react-router-dom";



export default function BudgetStrategySelectionCards(){
    const navigateto = useNavigate();
    const [budgetStrategyCards] = useState([
        {
            title: '1. The 50/20/30 Budget ', 
            text: `50% of  net income to your needs
                   20%  to savings
                   30% to  wants.
                   ` ,
                   
            image: pieimage ,
            path: "/50-20-30",
             

        },
        {
            title: '2. Pay Yourself First', 
            text: ` first “bill” you pay every month is to your savings account. 
                    After you pay yourself, you should pay your bills, then use the rest however you please!

                   `,
            image: yourselfimage,
             path: "/pay_your_self_first",

        },
        {
            title: '3.Zero-Based Budget', 
            text: `every single dollar of your income is assigned to a specific expense, 
                    leaving you with a balance of $0. 
                    Be sure to "include saving into your plan" as well!
                   `,
            image: zeroimage,
             path: "/zero_budget_strategy",

        },
        {
            title: '  4. Build Your Own ', 
            text: `You can build your new strategy ,
                   if the above doesn't works ! 
                   `,
            image: ownimage,
             path: "/build_your_own_strategy",

        },
        {
            title: '  4. Build Your Own ', 
            text: `You can build your new strategy ,
                   if the above doesn't works ! 
                   `,
            image: ownimage,
             path: "/build_your_own_strategy",

        },
    ]);
    // Function to handle logout
    const handleLogout = () => {
        // Redirect to "/home" page on logout
        navigateto("/");
    };


    return(
        <>
        <div>
        <button onClick={handleLogout} className="LogoutButton" >Logout</button>
        </div>
        <div className="card-container ">
            {budgetStrategyCards.map((budgetStrategyCard, index) => (
                <div key={index}
                className="card-button"
                onClick={() =>{
                    console.log("Navigating to:", budgetStrategyCard.path);
                
                     navigateto(budgetStrategyCard.path)
                }}
                 //className="card"
               
            //style={{ cursor: index === 0 ? "pointer" : "default" }}
                >
                    <h3>
                        {budgetStrategyCard.title}
                    </h3>
                    <img src={budgetStrategyCard.image} className="card-img"></img>

                    <p>
                        {budgetStrategyCard.text}
                        <br></br>
                    </p>
                </div>
            )
            )}
        </div>
        </>
        
    
    );

}