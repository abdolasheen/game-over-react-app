import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GamesContext } from "../GamesContext/GamesContext";

export default function Sort() {
  let { gamesBySort, getGamesBySort } = useContext(GamesContext);
  const { type } = useParams();
  const [gameCount, setgameCount] = useState(20);
  useEffect(() => {
    getGamesBySort(type);
    console.log(type);
  }, [type]);
  function updateGames() {
    if (gameCount <= gamesBySort.length - 20) {
      setgameCount(gameCount + 10);
    } else {
      console.log("End of the games");
    }
  }
  return (
    <>
      {gamesBySort.length > 0 ? (
        <div className="allGames bg-dark pt-3">
          <div className="container">
            <div className="row g-3 align-items-stretch">
              {gamesBySort.length > 0
                ? gamesBySort.splice(0, gameCount).map((game, index) => (
                    <div className="col-md-3" key={index}>
                      <Link
                        to={`/game/${game.id}`}
                        className="text-decoration-none"
                      >
                        <div className="card">
                          <img
                            src={game.thumbnail}
                            alt=""
                            className=" card-img-top"
                          />
                          <div className="card-body">
                            <h5 className="card-title position-relative h6 fw-bold text-white text-muted">
                              {game.title}
                              <span className="badge bg-success position-absolute end-0 ">
                                Free
                              </span>
                            </h5>
                            <p className="card-title position-relative text-white text-muted ">
                              {game.short_description
                                .split(" ")
                                .splice(0, 4)
                                .join(" ")}
                              {"  ..."}
                            </p>
                            <div className="cardFooter d-flex justify-content-between">
                              {/* <i class="fa-solid fa-plus text-info"></i> */}
                              <p className=" bg-info  rounded-3 p-1 ">
                                {game.genre}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                : ""}
              <div className="text-center">
                <button
                  className=" btn  text-muted btn-outline-dark border-white  "
                  onClick={updateGames}
                >
                  More Games
                  <i className=" fa fa-chevron-right "></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="allGames bg-dark pt-3">
          <div className="container">
            <div className="row g-3 align-items-stretch">
              {[1, 2, 3, 4, 5, 7, 8, 9].map((game, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card">
                    <div className="card-body placeholder-glow">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height="180"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#515457"></rect>
                      </svg>
                      <h5 className="placeholder-glow">
                        <span className="placeholder w-100"></span>
                      </h5>
                      <p className="placeholder-glow">
                        <span className="placeholder w-100"></span>
                        <span className="placeholder w-100"></span>
                      </p>
                      <a
                        href="#"
                        tabindex="-1"
                        className="btn btn-dark disabled placeholder col-6"
                      ></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
