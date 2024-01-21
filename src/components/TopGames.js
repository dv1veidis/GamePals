import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Card, Alert } from "react-bootstrap"   
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'

const TopGames = () => {

  useEffect(() => {
    fetchGames()
  },[])

  const [games, setGames] = useState([])

  const fetchGames = () => {
    fetch('https://api.rawg.io/api/games?key=93cbf9165d36478babf7db6b59b391a3&dates=2023-01-01,2023-12-31&ordering=-added&page_size=5')
    .then(resp => resp.json())
    .then(({results}) => setGames(results))
  }

    return (
        <>
      <div>
             <ThemeProvider theme={ mainTheme }>
            <GlobalStyles />
            <Sidebar />
            </ThemeProvider>
    </div>
     <div>
     <a href="https://rawg.io/"><h1 className="text-center mb-4">Powered by RAWG.io</h1></a>
    </div>       
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
                <img src={game.background_image} alt={game.id} width="640" height="360"/>
            </Link>
          </li>
        ))
      }
      </ul>
    </div>
    </>
  )
}

export default TopGames;
