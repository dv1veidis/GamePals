import React from "react"
import './style.css'
import square from '../images/square.png'
import triangle from '../images/triangle.png'
import cross from '../images/cross.png'
import circle from '../images/circle.png'

export default function MainPage() {
 return (
        <>
        <nav>
            <div className="d-flex justify-content-center align-items-center" style={{width:"100%"}}>
            <div className="logo">
            <p><h4>Game pals</h4></p>
        </div>
        <ul className="nav-links" >
            
            <li><a href="/">Home</a></li>
            <li><a href="/About">About us</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
        </ul></div> 
    </nav>
	
	<div className="lol">
	<p>Game Pals</p>
	</div>
	<div className="lolyou">
	<p>Game Pals allows users to connect with each other
    <br /> 
    and play a variety of different games, view a massive
    <br/> 
    video game database with detailed information and more. 
    </p>
	<a href="/signup" className="button">Join now</a>
    </div>
 
    <img src={square} alt="Square" style={{width:"300px", height:"250px" , float:"left", position:"absolute",top:"700px",right:"100px"}}/>
    <img src={triangle} alt="Triangle" style={{width:"300px", height:"250px", float:"left", position:"absolute", top:"700px", right:"1000px"}}/>
    <img src={cross} alt="Cross" style={{width:"300px", height:"250px",float:"left", position:"absolute" ,top:"700px",right:"400px"}}/>
    <img src={circle} alt="Circle" style={{width:"300px", height:"250px", float:"left", position:"absolute", top:"700px", right:"700px"}}/>
      </>

    )
}