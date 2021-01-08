import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container } from "react-bootstrap"
import {useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { database } from '../firebase'

function isChangingPassword(password, passwordConfirmation) {
    return password && passwordConfirmation
}

export default function UpdateProfile() {
    const passwordRef= useRef()
    const passwordConfirmRef = useRef()
    const photoUrlRef = useRef()
    const descriptionRef = useRef()
    const { currentUser, updatePassword } = useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading]=useState(false)
    const history = useHistory()
    var currentValues = {}
    var leadsRef = database.ref('users/' + currentUser.uid);
    leadsRef.on('value', function (snapshot) {
        currentValues = snapshot.val()
    });
   
     function handleSubmit(e){
        e.preventDefault()

        
        if(passwordRef.current.value !== passwordConfirmRef.current.value ){
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError("")
        if (isChangingPassword(passwordRef.current.value, passwordConfirmRef.current.value)){
        promises.push(updatePassword(passwordRef.current.value))
         }


         database.ref('users/' + currentUser.uid).set({
             username: currentValues.username,
             profilePicUrl: photoUrlRef.current.value ? photoUrlRef.current.value : currentValues.profilePicUrl,
             description: descriptionRef.current.value ? descriptionRef.current.value : currentValues.description
         });

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=>{
           setError("Failed to update account") 
        }).finally(()=>{
            setLoading(false)
        })



    }
    return (
        <>
        
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}
        >  
        
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="photoUrl">
                            <Form.Label>Change profile picture</Form.Label>
                            <Form.Control type="photoUrl" ref={photoUrlRef} placeholder="Select new profile picture" />
                        </Form.Group> 
                        <Form.Group id="description">
                            <Form.Label>Change Description</Form.Label>
                            <Form.Control type="description" ref={descriptionRef} placeholder={currentUser.description} />
                        </Form.Group> 
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}  placeholder="Leave blank to keep the same password"/>
                        </Form.Group> 
                        <Form.Group id = "password-confirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same password"/>
                        </Form.Group>
                        <Button disabled = {loading} className ="w-100"type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            <Link to="/view-profile" className="btn btn-info w-30 mt-1 mx-4">
                Back to profile
                </Link>
            <Link to="/Dashboard" className="btn btn-info w-30 mt-1 mx-4">
                Back to dashboard
                </Link>
            </div>
            </div>
            
            </Container>
            
        </>
    )
}