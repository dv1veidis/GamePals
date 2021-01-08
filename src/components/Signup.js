import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth } from '../context/AuthContext'
import { database } from '../firebase'
import {Link, useHistory} from "react-router-dom"
import logo from '../images/Logo.png'
import experimental from '../images/Experimental.png'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef= useRef()
    const passwordConfirmRef = useRef()
    const displayNameRef = useRef()
    const { signup } = useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading]=useState(false)
    const history = useHistory()
   
    async function handleSubmit(e){
        e.preventDefault()


        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            var result = (await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value))    
            database.ref('users/' + result.user.uid).set({
                username: displayNameRef.current.value,
                profilePicUrl: "",
                description: ""
            });
        history.push("/")
    }catch(error){
            setError("Failed to create an account")
            console.log(error)
    }
        setLoading(false)
    }
 
    return (
        <>
            <Container
         className="d-flex align-items-center justify-content-center"
         style={{minHeight: "100vh"}}
         >  
         <div className="w-100" style={{maxWidth: "400px"}}>
         <div div className="text-center">
            <img src = {experimental} alt='Experimental' />
         </div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="displayName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="displayName" ref={displayNameRef} required />
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
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?<Link to="/login"> Log in</Link>
            </div>
            <Link to="/" className="btn btn-primary w-100 mt-3">
                Back to Main page
            </Link>
            </div>
            </Container>
        </>
    )
}