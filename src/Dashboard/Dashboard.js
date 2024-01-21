import React from 'react'
import { GlobalStyles } from './styles/global'
import SideBar from './components/Sidebar/Sidebar'
import { mainTheme} from './styles/theme'
import { ThemeProvider } from 'styled-components'
import TopGames from '../components/TopGames'
import {useAuth} from '../context/AuthContext'
import {database} from '../firebase'
 

const Dashboard = () => {
    const { currentUser } = useAuth()
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });
    return (
        <>

        <div className="text-center">
            <h1>{profile.username}!</h1>
            <h2>These are the games we recommend you try out</h2>
            <TopGames />
        </div>
        </>
    )
}

export default Dashboard
