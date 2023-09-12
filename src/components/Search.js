import React, { useState } from 'react';
import Results from './Results';
import { Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { database } from '../firebase'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [gameResults, setGameResults] = useState([])
const { currentUser } = useAuth();
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()

    setGameResults([])
    fetch(`https://rawg.io/api/games?key=93cbf9165d36478babf7db6b59b391a3&search=${slug}`)
    .then(resp => resp.json())
    .then(({results}) => {
      results === undefined ? alert('no games found') : setGameResults(results)
    })
    setSearchTerm("")
    }
   

    return (
        <>
        <div className="text-center">
    <div>
             <ThemeProvider theme={ mainTheme }>
            <GlobalStyles />
            <Sidebar />
            </ThemeProvider>
    </div>
      <div className="text-center">
      <div className="game-search">
      <div>
     <a href="https://rawg.io/"><h1 className="text-center mb-4">Powered by RAWG.io</h1></a>
    </div> 
         <h1 className="text-center mb-4">Seach for your games here {profile.username}!</h1>
        <form onSubmit={onSubmit}>

          <input type="text" value={searchTerm} onChange={handleChange}/>
          <br></br>
          <input type="submit" className="btn btn-primary w-20 mt-1"/>
        </form></div>
        <Results gameResults={gameResults} />
                    </div>

       </div>
       </>
  );
}

export default Search;



