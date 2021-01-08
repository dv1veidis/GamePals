import React, { useState } from 'react';
import Results from './Results';
import { Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { database } from '../firebase'

const Search = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [gameResults, setGameResults] = useState([])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()

    setGameResults([])
    fetch(`https://rawg.io/api/games?search=${slug}`)
    .then(resp => resp.json())
    .then(({results}) => {
      results === undefined ? alert('no games found') : setGameResults(results)
    })
    setSearchTerm("")
    }
    const { currentUser } = useAuth();
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });

    return (
        <>
        <div className="text-center">
      <Link to="/Dashboard" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Dashboard
      </Link>
            <Link to="/TopGames" className="btn btn-info w-20 mt-1 mb-1 mx-1">
             Top games
    </Link>
    
    </div>

            <Card>
                <Card.Body>
      <div className="text-center">
      <div className="game-search">
         <h1 className="text-center mb-4">Seach for your games here {profile.username}!</h1>
        <form onSubmit={onSubmit}>
          <input type="text" value={searchTerm} onChange={handleChange}/>
          <br></br>
          <input type="submit" className="btn btn-primary w-20 mt-1"/>
        </form></div>
        <Results gameResults={gameResults} />
                    </div>
            </Card.Body>
        </Card>
       </>
  );
}

export default Search;



