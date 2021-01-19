import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth } from '../context/AuthContext'
import { database } from '../firebase'
import {Link, useHistory} from "react-router-dom"
import logo from '../images/Logo.png'
import font from '../images/font1.jpg'
import './style.css'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef= useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const { signup, verifyEmail } = useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState('')
    
   
    async function handleSubmit(e){
        e.preventDefault()


        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try{
            setMessage("")
            setError('')
            setLoading(true)
            var result = (await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value))
            database.ref('users/' + result.user.uid).set({
                username: displayNameRef.current.value,
                profilePicUrl: "https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
                description: "",
            })
            sendEmailVerification()
        
    }catch(error){
            setError("Failed to create an account")
    }
        setLoading(false)
    }
    
    const sendEmailVerification = () =>{

        verifyEmail()
        .then(()=>{
            setMessage("Verification email sent")
        })
        .catch(() => {
            setError("Failed to send a verification email")
        })
    }




 
    return (
    <div style={{ backgroundImage: `url(${font})` ,
        backgroundRepeat: 'no-repeat',
        width:'100%' }}>
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
            <Container
         className="d-flex align-items-center justify-content-end"
         style={{minHeight: "100vh"}}
         >   
         <div className="w-100" style={{maxWidth: "400px"}}>
         <div div className="text-center" >
            <img src = {logo} alt='Logo' />
         </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="displayName">
                            <Form.Label>Username(up to 16 characters)</Form.Label>
                            <Form.Control type="displayName" ref={displayNameRef} required maxLength="16"/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group> 
                        <Form.Group id = "password-confirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled = {loading} className ="w-100"type="submit">Sign up</Button>
                    </Form>            
                    <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login"> Log in</Link>
            </div>
                </Card.Body>
            </Card>

            <Link to="/" className="btn btn-primary w-100 mt-3">
                Back to Main page
            </Link>
            </div>
            </Container>
            
        </>
   </div> )
}