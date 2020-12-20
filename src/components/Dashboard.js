import React, { useState } from "react"
import { Button, Card, Alert} from "react-bootstrap"
import {useAuth } from '../context/AuthContext'
import {Link, useHistory} from 'react-router-dom'

export default function Dashboard() {
    const [error, setError]=useState("")
    const history = useHistory()
    const {logout}= useAuth()
   async function handleLogout(){
        setError('')

        try{
            await logout()
            history.push('/login')
        }catch{
            setError("Failed to log out")
        }
    }
    return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                    Update Profile
                </Link>
            </Card.Body>
        </Card>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
    </>
    )


}
