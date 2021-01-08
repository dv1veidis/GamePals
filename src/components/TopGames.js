import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, Alert } from "react-bootstrap"   

const TopGames = () => {

  useEffect(() => {
    fetchGames()
  },[])

  const [games, setGames] = useState([])

  const fetchGames = () => {
    fetch('https://rawg.io/api/collections/must-play/games')
    .then(resp => resp.json())
    .then(({results}) => setGames(results))
  }

    return (
        <>
      <div className="text-center">
      <Link to="/Dashboard" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Dashboard
      </Link>
      <Link to="/Search" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Search 
      </Link>
    
    </div>
            <Card>
                <Card.Body>
    <div className="text-center">
      <ul>
      {
        games.map(game => (
          <li key={game.id}>
            <Link to={{
                pathname: `/game/${game.name}`,
                gameProps:{
                  game: game
                }
              }}>
                    <h3 className="text-center mb-4">{game.name}</h3>
            <img src={game.background_image} alt="game" c/>
            </Link>
          </li>
        ))
      }
      </ul>
                    </div>
            </Card.Body>
          </Card>
    </>
  )
}

export default TopGames;
