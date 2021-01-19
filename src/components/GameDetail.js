import { Link } from 'react-router-dom'
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'

function GameDetail (props) {

  const { game } = props.location.gameProps

    return (
        <>
    <div className="text-center">

      <Link to="/Search" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Back to search
      </Link>
      <Link to="/Dashboard" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Back to the dashboard
      </Link>
      <div>
             <ThemeProvider theme={ mainTheme }>
            <GlobalStyles />
            <Sidebar />
            </ThemeProvider>
        </div>
    
    </div>
            <div className="text-center">

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




