import axios, { AxiosHeaders } from "axios";
import { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMainApi } from "../../Redux/Mainapi";
import { Loading } from "../LoadingScreen/Loading";

export function AllGames(){

    let [Allgames,setAllGames]= useState(null)
    let [gamesNumber,setgamesNumber]= useState(21)
   
    let dispatch = useDispatch()
        
    let  {allgames}  =useSelector(function(state){return state.game})
   


      
     
    useLayoutEffect(()=>{
      dispatch(getMainApi())
   
      
    })
      
     
    // useEffect( async function(){
     
    //   ()=>{  dispatch(()={getMainApi()})}

    // },[])
    
    function getMoreGames(){
      let newgamesNumber =gamesNumber+=21
      setgamesNumber(newgamesNumber)
      getMainApi()
   

      


    }




    return <div className="container all w-75 py-4">
       < Helmet>
         <title>
        AllGames
         </title>
      </ Helmet>


<div className="row g-3 my-4">

{allgames? allgames?.map(function(game,idx){return <div  key={game.id} className="  col-lg-4  col-md-6">
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
 </div>


}) :  <Loading/>
}






 


</div>



</div>
    


   
}