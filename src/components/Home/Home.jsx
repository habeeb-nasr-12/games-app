import axios, { AxiosHeaders } from "axios";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, Link, useParams } from "react-router-dom";
import { getMainApi } from "../../Redux/Mainapi";
import { Loading } from "../LoadingScreen/Loading";
import { Helmet } from "react-helmet-async";

export function Home() {
  let Allgames = [];

  let dispatch = useDispatch();

  let { allgames } = useSelector(function (state) {
    return state.game;
  });

  useLayoutEffect(() => {
    dispatch(getMainApi());
  });

  return (
    <section className="home">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="  text-center">
        <div className=" home-sec  mb-2">
          <h1 className="jumbotron-heading">
            Find &amp; track the best{" "}
            <span className="bg-blue">free-to-play </span>
            games!
          </h1>
          <p className="lead text-muted">
            Track what you've played and search for what to play next! Plus get
            free premium loot!{" "}
          </p>
          <p>
            <Link
              role="button"
              className="btn btn-outline-secondary btn-md ml-0"
              to={"/all"}
            >
              Browse Games
            </Link>
          </p>
        </div>
      </div>
      <div className="  container py-4">
        <h3>
          <i className="fas fa-robot me-2"></i>Personalized Recommendations
        </h3>

        <div className="row py-4">
          {allgames ? (
            allgames?.map(function (game, idx) {
              return (
                <div key={game.id} className="col-lg-4  col-md-6">
                  <Link
                    className="text-decoration-none "
                    to={"/games/Gamedetails/" + game.id}
                  >
                    <div className="game">
                      <img
                        src={game.thumbnail}
                        alt="game img"
                        className="w-100 rounded"
                      />
                      <p className="py-3 px-2 d-flex justify-content-between">
                        <span className="fw-bold">{game.title}</span>
                        <span className="bg-info text-white  rounded p-1">
                          free
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  );
}
