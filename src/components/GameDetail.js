import { Link } from 'react-router-dom'
import { Button, Card, Alert } from "react-bootstrap"
const GameDetail = (props) => {

  const { game } = props.location.gameProps

    return (
        <>
    <div className="text-center">
      <Link to="/Dashboard" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Dashboard
      </Link>
      <Link to="/Search" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Search 
      </Link>
            <Link to="/TopGames" className="btn btn-info w-20 mt-1 mb-1 mx-1">
             Top games
    </Link>
    
    </div>
            <div className="text-center">
                <Card>
                <Card.Body>
      <h1>{game.name}</h1>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
      <h3>Genre(s):</h3>
        { 
          game.genres.map(g => `${g.name} | `)
        }

      <h3>Platform(s):</h3>
        { 
          game.platforms.map(p => `${p.platform.name} | `)
        }
            </Card.Body>
                    </Card>
      <ul>
        {
                        game.short_screenshots.map(ss => <li><img src={ss.image} alt='screenshot'></img></li>)
        }
      </ul>
     </div>
    </>
  );
}

export default GameDetail;




