import React, {useState} from 'react';
import logoimage from './assets/react.svg';




export function MainGoal(){
    return(
    <h1> My Main goal: is to learn React in detail! </h1>
    )
}
//dynamic color Values 
const reactdynamicdescription = ['Pink' , 'Yellow' , 'white', 'Blue', 'Red' ,'green' , 'purple' , 'orange'];
// to select random index of reactdynamicdescription
function getRandomInt(max){
  return Math.floor(Math.random() * (max+1));
}

function App() {
  //storing the random index value in description variable 
  const description = reactdynamicdescription[getRandomInt(7)];
  //setting background color as per the lucky color 
  document.body.style.backgroundColor = description.toLocaleLowerCase();
  return (
    
    <div id="app"  >
       {/* in the place of description the color is shown  */}
      <h1> your lucky color is {description}</h1>
      <div className="center-container" >
      <img src={logoimage} alt="Stylized atom" />
      </div>
      <h1>Time to Practice!</h1>
      <MainGoal />
      
      {/* DON'T CHANGE THE TEXT / CONTENT ABOVE */}
      {/* OUTPUT YOUR COMPONENT HERE */}
    </div>
  );
}

export default App;
