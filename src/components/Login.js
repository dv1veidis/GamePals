import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth} from '../context/AuthContext'
import {Link, useHistory} from "react-router-dom"
import font1 from '../images/font1.jpg'
import Logo from '../images/Logo.png'
import './style.css'


export default function Login() {
    const emailRef= useRef()
    const passwordRef= useRef()
    const {login, logout, currentUser} = useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading]=useState(false)
    const history = useHistory()

   
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/Dashboard")
        
    }catch{
        setError("Failed to log in")
    }
    setLoading(false)
    }

    if (loading){
        return <h1>Loading...</h1>
    }
    return (
        
        <div style={{ backgroundImage: `url(${font1})` ,
        backgroundRepeat: 'no-repeat',
        width:'100%' }}>
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
            <Container
         className="d-flex align-items-center justify-content-end"
         style={{minHeight: "100vh"}}
         >  
         <div className="w-100" style={{maxWidth: "400px"}}>
            <div div className="text-center">
            <img src = {Logo} alt='logo' />
            </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group> 
                        <Button disabled = {loading} className ="w-100"type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign up here</Link>
            </div>
                </Card.Body>
            </Card>
            
            <Link to="/" className="btn btn-primary w-100 mt-3">
                Back to Main page
            </Link> </div>
             </Container>
            
        </>
       </div>
    )
}
