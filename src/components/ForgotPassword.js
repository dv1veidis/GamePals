import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth} from '../context/AuthContext'
import {Link} from "react-router-dom"
import logo from '../images/Logo.png'
import font from '../images/font1.jpg'
import './style.css'

export default function ForgotPassword() {
    const emailRef= useRef()
    const {resetPassword} = useAuth()
    const [error, setError]= useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading]=useState(false)
   
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check you inbox for further instructions")
    }catch{
        setError("Failed to reset password")
    }
    setLoading(false)
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
            <div div className="text-center">
            <img src = {logo} alt='logo' />
            </div>     
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled = {loading} className ="w-100"type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign up here</Link>
            </div>
                </Card.Body>
            </Card>
            
            </div>
            </Container>
            
        </>
        </div>
    )
}