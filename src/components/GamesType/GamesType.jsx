import axios from "axios";
import {React, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

import homeStyle from "../Home/home.module.css";
import { Loading } from "../LoadingScreen/Loading";

export default function GamesType() {

  let [gamesNumber,setgamesNumber]= useState(21)



  function getMoreGames(){
    let newgamesNumber =gamesNumber+=21
    setgamesNumber(newgamesNumber)
   getApiGame()
 

    


  }

  const { type, specific } = useParams();
  const [respApiGame, setApiGame] = useState(null);
  // console.log( type, specific );
  async function getApiGame() {
    const options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      params: { [type]: specific },
      headers: {
        "X-RapidAPI-Key": "18ed92c0e8mshc528884bcf732bdp1634f8jsn9463ef451ea9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let { data } = await axios.request(options);
    let newData = {...respApiGame}; 
    newData = data.splice(0,gamesNumber);
    setApiGame(newData);
  }
  
  useEffect(() => {
    getApiGame();
  },[type,specific]);

  return <>
  <div className="container games w-75 py-4">
    <div className="row g-3 my-4">
    < Helmet>
         <title>
        {specific}
         </title>
      </ Helmet>

      {respApiGame != null  ? respApiGame?.map(function(game,idx){return  <div  key={game.id} className=" col-lg-4  col-md-6">
        <Link className="text-decoration-none " to={"/games/Gamedetails/"+ game.id}>
           <div className="game rounded">
              
         
           <img src={game.thumbnail} alt="game img"  className="w-100 rounded" />  
           <div className="py-3 px-2 d-flex justify-content-between"><span className="fw-bold">{game.title}</span>  
            <span className=" d-flex  justify-content-center align-items-center blue text-white   rounded  ">free</span></div>
            <p className="py-2 fw-bold  game-desc  px-2" > {game.short_description} </p>
            <div className="d-flex justify-content-between" >
            <i  className="fas fa-plus-square mx-2"></i>
            <div className="mx-2" >
              <span className="text-muted badge-secondary mx-2 text-dark  me-2">{game.genre}</span>
                <i  className="fab fa-windows text-muted "></i>
               </div>
            </div>
         </div>
        
        
        
         
           </Link>
         </div>  }):  <Loading/>}




   <div  onClick={getMoreGames} className=" d-flex justify-content-center"> 
   <button  className="btn   btn-outline-secondary py-2 pt-1 more-btn">More Games
    <i  className="fas fa-angle-right"></i></button> </div>



    


 




</div>

</div>
    
    </>
  
}
