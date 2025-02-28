import React from "react"; 
import componentimg from './assets/components.png';
import propsimg from './assets/props.png';
import hooksimg from './assets/Hooks.png';



function Core_concepts(props){
    return (
        <div style={{
            textAlign: "center",
            padding: "10px",
        }}>
            <img src ={props.image} alt= {props.title}style={{ width: "100px", height: "100px" }} />
            <h3> {props.title}</h3>  
            <p>{props.description}</p>
 </div>
       
    )

}
export function Newpage(){
 return(
    <div style={{
        display: "flex",    // Ensures items are placed in a row
        flexDirection: "row", // Explicitly sets horizontal layout
        justifyContent: "center",  // Centers images horizontally
        alignItems: "center",  // Aligns images vertically in the center
        gap: "20px",  // Provides spacing between images
        marginTop: "20px",
        width: "100%", 
    }} >
        <ul>
            <Core_concepts 
            image ={componentimg}
            title = "Components"
            description = "React Components are like functions in javascript ! "
            />
            <Core_concepts 
            image ={propsimg}
            title = "Props"
            description = "Props are like parameters , passing data to components! "
            />
            <Core_concepts 
            image ={hooksimg}
            title = "Hooks"
            description = "Hooks allow function components to have access to state and other React features. "
            />
        </ul>

    </div>
 );   
}