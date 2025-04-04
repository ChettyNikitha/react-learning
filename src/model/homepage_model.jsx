
import { useState } from "react";
import pieimage from '../assets/chart-50-30-20-budget.jpg';
import yourselfimage from '../assets/yourfirst.png';
import zeroimage from '../assets/zerobudgetimage.png';
import ownimage from '../assets/ownimage.jpg';


export default function BudgetStrategySelectionCards(){
    const [budgetStrategyCards] = useState([
        {
            title: '1. The 50/20/30 Budget ', 
            text: `50% of  net income to your needs
                   20%  to savings
                   30% to  wants.
                   ` ,
            image: pieimage

        },
        {
            title: '2. Pay Yourself First', 
            text: ` first “bill” you pay every month is to your savings account. 
                    After you pay yourself, you should pay your bills, then use the rest however you please!

                   `,
            image: yourselfimage

        },
        {
            title: '3.Zero-Based Budget', 
            text: `every single dollar of your income is assigned to a specific expense, 
                    leaving you with a balance of $0. 
                    Be sure to "include saving into your plan" as well!
                   `,
            image: zeroimage

        },
        {
            title: '  4. Build Your Own ', 
            text: `You can build your new strategy ,
                   if the above doesn't works ! 
                   `,
            image: ownimage

        },
    ]);

    return(
        <div className="card-container " >
            {
              budgetStrategyCards.map((budgetStrategyCards,index) => (
                <div key={index}  className="card">
                    <h3>
                                {budgetStrategyCards.title}
                    </h3>
                    <img src={budgetStrategyCards.image} className="card-img"></img>

                    <p>
                        {budgetStrategyCards.text}
                        <br></br>
                    </p>
                </div>
              )
            )} 
        </div>
    
    );

}