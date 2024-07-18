import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom"
import { Loading } from "../LoadingScreen/Loading";


export function Gamedetails() {
    let {id} =useParams()
     let[gameDetails,setgameDetails] =useState(null)

     const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
        params: {id: id},
        headers: {
          'X-RapidAPI-Key': 'fa7d552fdfmsh29adebcace07b64p15baecjsn34115d66cfe6',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      
    
    function getGameDetails(){
        axios.request(options).then(function (response) {
            setgameDetails(response.data)
        }).catch(function (error) {
            
        });
  
    }
    useEffect(function(){
        getGameDetails()
    })



    return <>
        {gameDetails? <section ><div className="container my-5"><div className="row mt-5">
        < Helmet>
         <title>
         {gameDetails.title}
         </title>
      </ Helmet>
            <div className="col-md-4">
                <div >
                    <img alt="game" className="w-100 rounded-2" src={gameDetails.thumbnail} />
                    <div className="row mt-2 w-100 justify-content-between me-0 pe-0">
                        <div className="col-3 col-lg-2 me-2">
                            <span className="btn btn-dark  mb-3 free py-2 cursor">FREE</span></div>
                        <div className="col me-0 pe-0">
                            <a type="button" name="playnow" rel="nofollow" target="_blank" className="btn play btn-block w-100 mx-2 py-2 me-0" href={gameDetails.game_url}><strong >PLAY NOW </strong>
                                <i className="fas fa-sign-out-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <h2 >{gameDetails.title}</h2>
                <h5 className="mt-3">About  {gameDetails.title}</h5>
                <p >{gameDetails.description}

                </p>
                <h5 className="mt-3">Minimum System Requirements</h5>


    {gameDetails.minimum_system_requirements? <ul className="list-unstyled ms-2">
                    <li >
                    
                        <strong  className="mx-2">graphics : </strong>{gameDetails.minimum_system_requirements?.graphics}</li>
                    <li >
                        <strong className="mx-2" >memory : </strong>{gameDetails.minimum_system_requirements?.memory}</li>
                    <li ><strong className="mx-2" >os : </strong> {gameDetails.minimum_system_requirements?.os}</li>
                    <li >
                        <strong  className="mx-2">processor : </strong > {gameDetails.minimum_system_requirements?.processor}</li>
                        <li >
                        <strong className="mx-2"  >storage : </strong>{gameDetails.minimum_system_requirements?.storage}</li></ul>: ""
                        
    }         
    
   
                        <h4  className="my-3">{gameDetails.title} screenshots</h4>
                {gameDetails.screenshots.length!=0?<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src= {gameDetails?.screenshots[0]?.image} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={gameDetails?.screenshots[1]?.image} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={gameDetails?.screenshots[2]?.image} className="d-block w-100" alt="..." />
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
                </button>
                        
                    </div>
                </div> :""
                }
                <h2  className="my-2">Additional Information</h2>
                <hr className="mt-2 mb-3" />
                <div className="row mb-3" >
                    <div className="col-6 col-md-4"><span className="text-muted">Title<br /></span><p >{gameDetails?.title}</p></div>
                    <div className="col-6 col-md-4"><span className="text-muted">Developer<br /></span>{gameDetails?.developer} </div><div className="col-6 col-md-4">
                        <span className="text-muted">Publisher<br /></span> {gameDetails?.publisher} </div><div className="col-6 col-md-4">
                        <span className="text-muted">Release Date
                            <br /></span>{gameDetails?.release_date} </div>
                    <div className="col-6 col-md-4"><span className="text-muted">Genre<br />
                    </span> {gameDetails?.genre} </div>
                    <div className="col-6 col-md-4">
                        <span className="text-muted">Platform<br /></span><i className="fab fa-windows me-1"></i>{gameDetails?.platform}
                    </div>
                </div>
            </div>
        </div>
        </div>





        </section>: <Loading/>}







    </>
}