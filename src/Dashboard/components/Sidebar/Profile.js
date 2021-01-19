import React from 'react'
import styled from 'styled-components'
import { database } from '../../../firebase'
import {useAuth} from '../../../context/AuthContext'


const Container = styled.div`
    margin-top: 5rem;
`

const ProfileImg = styled.img`
    height: 5rem;
    width: 7rem;
`
const ProfileName = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
    color: #FFF;
`


const Profile = () => {
    const { currentUser } = useAuth()
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });
    return (
        <Container>

            <ProfileImg src={profile.profilePicUrl} />
            <ProfileName>{profile.username}</ProfileName>
        </Container>
    )
}

export default Profile
