import React, { useState } from "react"
import { Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../firebase'
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'

export default function ViewProfile() {
    const { currentUser } = useAuth()
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });


    return (
         <>
         <div className="text-center">
        <div>
             <ThemeProvider theme={ mainTheme }>
            <GlobalStyles />
            <Sidebar />
            </ThemeProvider>
        </div>
       <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
        >  
        <div className="w-100"  style={{maxWidth: "100%"}}>
            <div className="text-center">
                    <h1 className="text-center mb-4">Your Profile</h1>
                    <h4>Email</h4>
                    <p>{currentUser.email}</p>
                    <h4>Username</h4>
                    <p>{profile.username}</p>
                    <h4>Profile Picture</h4>
                    <p><img src={profile.profilePicUrl} alt="photo" style={{maxWidth: "60%"}}/></p>
                    <h4>Description</h4>
                    <p>{profile.description}</p>
                    <Link to="/update-profile" className="btn btn-primary w-50 mt-3">
                        Update Profile
                </Link>
                </div>
                </div>
                </Container>
        </div>
        </>    )


}
