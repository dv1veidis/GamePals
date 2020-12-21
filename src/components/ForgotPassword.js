import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert } from "react-bootstrap"
import {useAuth} from '../context/AuthContext'
import {Link} from "react-router-dom"
import logo from '../images/Logo.png'
import experimental from '../images/Experimental.png'

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
        <>      
            <div div className="text-center">
            <img src = {experimental} alt='Experimental' />
            </div>     
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
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
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign up here</Link>
            </div>
        </>
    )
}