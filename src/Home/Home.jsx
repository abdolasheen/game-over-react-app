import React, { useContext, useEffect } from "react";
import { GamesContext } from "../GamesContext/GamesContext";
import img from "../imgs/thumbnail.jpg";
import { Link } from "react-router-dom";
export default function Home() {
  let { allGames, getAllGames } = useContext(GamesContext);

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <div className="hero text-center py-5 text-white">
        <h2>
          Find & track the best <span className="text-info">free-to-play</span>{" "}
          games!
        </h2>
        <p className="text-muted">
          Track what you've played and search for what to play next! Plus get
          free premium loot!{" "}
        </p>
        <Link
          className=" btn  text-muted btn-outline-dark border-white "
          to="/games/all"
        >
          Browse Games
        </Link>
      </div>
      <div className="homeGames text-white text-muted py-5">
        <div className="container">
          <div className="row">
            <h2 className="mb-4">
              <i className="fas fa-robot "></i>Personalized Recommendations
            </h2>
            {allGames.length > 0
              ? allGames.splice(0, 3).map((game, index) => (
                  <div className="col-md-4" key={index}>
                    <Link
                      to={`/game/${game.id}`}
                      className=" text-decoration-none text-white text-muted"
                    >
                      <div className="card">
                        <img
                          src={game.thumbnail}
                          alt=""
                          className=" card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title position-relative">
                            {game.title}
                            <span className="badge bg-success position-absolute end-0 ">
                              Free
                            </span>
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
// [].splice()
