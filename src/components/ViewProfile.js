import React, { useState } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../firebase'

export default function ViewProfile() {
    const [error, setError] = useState("")
    const history = useHistory()
    const { logout, currentUser } = useAuth()
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Your Profile</h2>
                    <h4>Email</h4>
                    <p>{currentUser.email}</p>
                    <h4>Username</h4>
                    <p>{profile.username}</p>
                    <h4>Profile Picture</h4>
                    <p><img src={profile.profilePicUrl} alt="photo" style={{maxWidth: "99%"}}/></p>
                    <h4>Description</h4>
                    <p>{profile.description}</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                </Link>
                </Card.Body>
            </Card>
            <Link to="/" className="btn btn-primary w-100 mt-3">
                Back to dashboard
                </Link>
        </>

    )


}
