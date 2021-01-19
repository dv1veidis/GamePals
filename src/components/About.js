import React from 'react'
import './style.css'
import Vulogo from '../images/1200px-Vilnius_university_logo.svg.png'

export default function About() {
    return (
        <>
        <nav>
        <div className="d-flex justify-content-center align-items-center" style={{width:"100%"}}>
        <div className="logo">
            <p><h4>Game pals</h4></p>
        </div>
        <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/About">About us</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
        </ul>
        </div>
    </nav>
	
	<div className="lol">
	<p>About us</p>
    </div>
    <div class="lmao">
	<p>This project was developed for a computer <br/>architecture class  by a group of students studying at <br/> the university of Vilnius (ISI year 1).<br/> By building this app we gained basic knowledge<br/> in the field of Web Development.</p>
    <p>Front-end:Deividas Gelžinas(Listings,Login/Register,Dashboard etc.), Karolis Seibutis(Main page),Julius Ivoška(Dashboard)</p>
    <p>Back-end:Deividas(FireBase),Julius(Profiles),Giedrius Lukoševičius(Game database)</p>
    <p>Documentation:Miglė Kiršytė</p>
    </div>
	
	<img src={Vulogo} alt="VU Logo" style={{width:"512px", height:"512px", float:"left", position:"absolute", top:"100px", right:"50px"}}/>
	
    </>
    )
}
