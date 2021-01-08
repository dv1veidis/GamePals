import React, { useState } from "react"
import { Button, Card, Alert} from "react-bootstrap"
import {useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../firebase'
import experimental from '../images/Experimental.png'

export default function Dashboard() {
    const [error, setError]=useState("")
    const history = useHistory()
    const { logout, currentUser } = useAuth()
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });


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
                    <h2 className="text-center mb-4">Welcome {profile.username}!</h2>
                    <p className="text-center mb-4">What are you playing today?</p>
                </Card.Body>
            </Card>
            <Card>
                <>
                    <Card>
                        <Card.Body>
                            <p className="text-center mb-4"> Thank you for choosing GamePals for your gaming needs! </p>  
                            <h1 className="text-center mb-3">Search for games to play with your friends</h1>
                            <div className="text-center m">
                            <Link to="/Listings" className="btn btn-primary w-20 mt-3">
                                Search for listings
                            </Link></div>
                            <div className="text-center m">    
                            <Link to="/Search" className="btn btn-primary w-20 mt-3">
                                Search for games here!
                            </Link> </div>
                            <div className="text-center m">
                            <Link to="/TopGames" className="btn btn-primary w-20 mt-3">
                                Look at the current top games here!
                            </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </>
                    
            <Card.Body>
                    <h2 className="text-center mb-4">View your profile here!</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="text-center m">
                <Link to="/view-profile" className="btn btn-primary w-20 mt-1">
                    View Profile
                </Link>
                </div>
            </Card.Body>
            </Card>
        <div className="text-right m">
        <Button onClick={handleLogout} className="btn btn-info w-20 mt-2 mx-2">Log Out</Button></div>
    </>
    )


}
