import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Alert } from "react-bootstrap"
import Sidebar from '../Dashboard/components/Sidebar/Sidebar'
import { GlobalStyles } from '../Dashboard/styles/global'
import { mainTheme} from '../Dashboard/styles/theme'
import { ThemeProvider } from 'styled-components'
import firebase from '../firebase'
import {useAuth} from '../context/AuthContext'
import {database} from '../firebase'
import {v4 as uuidv4} from 'uuid'
import { useLocation } from "react-router-dom";

export default function SingleListing (props){
    const { listings } = props.location.listingsProps;
    const ID=listings.id;
    const [comments, setComments]= useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment]=useState("");
    const {currentUser}=useAuth();
    const currentUserId=currentUser.uid;
    var leadsRef = database.ref('users/' + currentUser.uid);
    var profile = {}
    leadsRef.on('value', function (snapshot) {
        profile = snapshot.val();
    });
   const ref = firebase.firestore().collection("comments");
    function getComments(){
      setLoading(true);
      ref.where("listingid",'==',ID).orderBy('createdAtValue','desc').onSnapshot((querySnapshot) => {
          const items=[];
          querySnapshot.forEach((doc)=>{
              items.push(doc.data());
          });
          setComments(items);
          setLoading(false);
      })
  }
  useEffect(()=>{
    getComments();
}, []);

function addComments (){
  const timestamp=Date.now();
  const owner=profile.username;
  const ownerid= currentUserId;
  const listingid=listings.id;
  const profilePhoto=profile.profilePicUrl;
  const newComment={
      profilePhoto,
      comment,
      listingid,
      owner,
      ownerid,
      id:uuidv4(),
      createAt: new Date(),
      createdAtValue: timestamp,
  };
  ref.doc(newComment.id)
  .set(newComment)
  .catch((err)=>{
      console.error(err);
  });
}


    return (
        <>
    <div className="text-center">

      <Link to="/listings" className="btn btn-info w-20 mt-1 mb-1 mx-1">
                Back to listings
      </Link>
      <div>
             <ThemeProvider theme={ mainTheme }>
            <GlobalStyles />
            <Sidebar />
            </ThemeProvider>
        </div>
    
    </div>
    <Fragment>
            <div className="text-center">

      <h1>{listings.title}</h1>
      <p>Owner: {listings.owner}</p>
      <p>Player Count: {listings.playerCount}</p>
     
     <div className='InputBox'>
            <h3>Comments</h3>
            <h5>Write comments</h5>
            <input type="comment" onChange={ (e)=> setComment(e.target.value)} maxLength="50"/>
            <button onClick={()=> addComments()}>
            Submit
            </button>
            </div>
            <hr />
            
        
        <h2>Comments</h2>
        
        <div className="d-inline-flex flex-column justify-content-center">
        {comments.map(comments =>(
        <div key={comments.id} style={{borderStyle:"solid", borderWidth:"5px", width:"500px", height:"125px"}} className="mb-2">
            <p className="d-flex"style={{fontSize:"35px"}}><img src={comments.profilePhoto} alt="photo" className style={{Width: "40px", height:"40px",borderRadius:"50%"}}/>   {comments.owner} </p>
            <p className="d-flex">{comments.comment}</p>
            
        </div>          
    ))}
    </div>
    
    </div>
    </Fragment>

          </>
  );
}

