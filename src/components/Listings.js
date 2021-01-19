import React, {useState, useEffect, Fragment} from 'react'
import firebase from '../firebase'
import {Alert, Button} from 'react-bootstrap'
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'
import {v4 as uuidv4} from 'uuid'
import { useAuth } from '../context/AuthContext'
import {database} from '../firebase'
import { Link , useHistory} from 'react-router-dom'



export default function Listings() {
    const [listings, setListings]= useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle]=useState('');
    const [description, setDescription] = useState('');
    const [playerCount, setPlayerCount]=useState('');
    const {currentUser}=useAuth();
    const[error, setError] = useState('');
    const currentUserId=currentUser.uid;
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });

    const ref = firebase.firestore().collection("listings");

    function getListings(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items=[];
            querySnapshot.forEach((doc)=>{
                items.push(doc.data());
            });
            setListings(items);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getListings();
    }, []);

    function addListing (){
        const owner=profile.username;
        const ownerid= currentUserId;
        const newListing={
            title,
            description,
            playerCount: +playerCount,
            id:uuidv4(), 
            owner,
            ownerid,
        };
        ref.doc(newListing.id)
        .set(newListing)
        .catch((err)=>{
            console.error(err);
        });
    }

    function deleteListing(listings){
        ref.doc(listings.id)
        .delete()
        .catch(()=>{
            setError("This is not your listing");
        });
    }

    function editListing(listings){
        const updatedListing={
            title,
            description,
            playerCount: +playerCount,
        }
        setLoading();
        ref.doc(listings.id)
        .update(updatedListing)
        .catch(()=>{
            setError("This is not your listing");
        })
    }
    

    if (loading){
        return <h1>Loading...</h1>
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
    <Fragment>
    <div className="text-center">
        <h1>These are the player listings</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className='InputBox'>
            <h3>Add a new listing</h3>
            <h5>Title of the game</h5>
            <input type="text" onChange={ (e)=> setTitle(e.target.value)} maxLength="30"/>
            <br />
            <h5>Description(up to 50 characters)</h5>
            <textarea onChange={(e)=> setDescription(e.target.value)} maxLength="50"/>
            <br />
            <h5>Looking for how many players?(up to 20)</h5>
            <input type="text" onChange={ (e)=> setPlayerCount(e.target.value)}/>
            
            </div>
            <button onClick={()=> addListing()} className="mt-2">
            Submit
            </button>
            <hr />
            {loading ? <h1>Loading...</h1>: null}
            
        {listings.map(listings =>(
            <div >
                      <ul>     
          <li key={listings.id}>
            <Link to={{
                pathname: `/singlelisting/${listings.id}`,
                listingsProps:{
                    listings: listings
                }
              }}>
              <Button >      
<div key={listings.id}>
            <h2>{listings.title}</h2>
            <p>{listings.owner}</p>
            <p>{listings.description}</p>
            <p>{listings.playerCount}</p>

            <p>{listings.id}</p>
            <div>
                <button className="mx-1" onClick={()=> deleteListing(listings)}>Delete</button>
                <button onClicl={()=> 
                    editListing({listings})}>
                     Edit
                     </button>

            </div><br />
        </div></Button>
            </Link>
          </li>
        

      
      </ul>
        
     </div>
    ))}
    
    </div>
    
    </Fragment>
    </div>
    </>
    )

}


