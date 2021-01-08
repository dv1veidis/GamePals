import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import logo from '../images/Logo.png'
import name from '../images/Name.png'
import experimental from '../images/Experimental.png'
import retard from '../images/Untitled.png'

export default function MainPage() {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    return (
        <>
            <div div className="text-center">
                <img src={experimental} alt='Experimental' />
            </div>
            <Card>
                <Card.Body>
                    <Link to="/signup" className="btn btn-primary w-100 mt-3">
                        Sign up here!
            </Link>

                    <Link to="/login" className="btn btn-primary w-100 mt-3">
                        Log in here!
            </Link>
                </Card.Body>
            </Card>
        </>
    )
}