import React, { useState } from "react"
import MenuLink from './MenuLink'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../../../context/AuthContext'


const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`

const Menu = () => {
    const [error, setError]=useState("")
    const history = useHistory()
    const { logout } = useAuth()
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
        <Container>
            <Link to="/view-profile"><MenuLink title="Profile" /></Link>
            <Link to="/search"><MenuLink title="Game search" /></Link>
            <Link to="/listings"><MenuLink title="Player listings" /></Link>
            <Link to="/Dashboard"><MenuLink title="Dashboard" /></Link>
            <a onClick={handleLogout}><MenuLink title="Log out" /></a>
        </Container>
    )
}

export default Menu
