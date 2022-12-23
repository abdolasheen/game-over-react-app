import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";

// import { GamesContext } from "../GamesContext/GamesContext";
// import { Game } from "./GameInterface";

export default function GameDtails() {
  const [gameDetails, setgameDetails] = useState<any>(null);
  const [vidHover, setvidHover] = useState<boolean>(true);

  const { id } = useParams();
  async function getGameDetails(id: any) {
    let res = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setgameDetails(res.data);
    console.log(res.data);
  }
  function playVideo() {
    console.log("entered");

    setvidHover(false);
  }
  function pauseVid() {
    console.log("leave");

    setvidHover(true);
  }
  useEffect(() => {
    getGameDetails(id);
    console.log(gameDetails);
    const clip: any = document.querySelectorAll(".hover-to-play");
    for (let i = 0; i < clip.length; i++) {
      clip[i].addEventListener("mouseenter", function () {
        clip[i].play();
      });
      clip[i].addEventListener("mouseout", function () {
        clip[i].pause();
      });
    }
  }, []);

  return (
    <>
      {!gameDetails ? (
        <div className="loader w-100 vh-100 position-fixed bg-dark d-flex justify-content-center ">
          <div className="mt-5 pt-5">
            <i className="fa-regular fa-circle fa-bounce fs-1  text-info  ms-4"></i>
            <i className="fa-solid fa-xmark  fa-bounce fs-1  text-info ms-4"></i>
            <i className="fa-solid fa-play fs-1 ms-4 text-info fa-bounce"></i>
          </div>
        </div>
      ) : (
        <div
          className="gameDetails"
          style={{
            backgroundImage: `url(${gameDetails.screenshots[0].image}) `,
          }}
        >
          <div className="overLay pt-5 ">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="imgWraper rounded-2  overflow-hidden bg-info  "
                    onMouseEnter={playVideo}
                    onMouseLeave={pauseVid}
                  >
                    {vidHover ? (
                      <img
                        src={gameDetails.thumbnail}
                        alt=""
                        className="w-100"
                      />
                    ) : (
                      <video
                        typeof="video/webm"
                        src={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                        className="hover-to-play w-100"
                      ></video>
                    )}
                  </div>
                  <div className="cta mt-4">
                    <a className="btn btn-dark w-25 fw-bold">Free</a>
                    <a
                      className="btn btn-info w-75 text-white fw-bold"
                      href={gameDetails.game_url}
                      target="_blank"
                    >
                      Play Now
                    </a>
                  </div>
                </div>
                <div className="col-md-8 text-white-50 ">
                  <h2>{gameDetails.title}</h2>
                  <h5>About {gameDetails.title} </h5>
                  <p className="fs-5">{gameDetails.description}</p>
                  <h5>Minimum System Requirements</h5>
                  <h6>
                    Graphics :
                    {gameDetails.minimum_system_requirements
                      ? gameDetails.minimum_system_requirements.graphics
                      : ""}
                  </h6>
                  <h6>
                    Memory :{" "}
                    {gameDetails.minimum_system_requirements
                      ? gameDetails.minimum_system_requirements.memory
                      : ""}
                  </h6>
                  <h6>OS :{gameDetails.platform}</h6>
                  <h6>
                    Processor :{" "}
                    {gameDetails.minimum_system_requirements
                      ? gameDetails.minimum_system_requirements.processor
                      : ""}
                  </h6>
                  <h6>
                    Storage :{" "}
                    {gameDetails.minimum_system_requirements
                      ? gameDetails.minimum_system_requirements.storage
                      : ""}
                  </h6>
                  <h4 className="h3">{gameDetails.title} screenshots</h4>
                  {gameDetails.screenshots.length > 0 ? (
                    <Carousel>
                      {gameDetails.screenshots.map(
                        (gameScreenShoot: any, index: any) => (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={gameScreenShoot.image}
                              alt="First slide"
                              key={index}
                            />
                          </Carousel.Item>
                        )
                      )}
                    </Carousel>
                  ) : (
                    ""
                  )}
                  <h4 className="h3 mt-2">Additional information</h4>
                  <div className="row">
                    <div className="col-md-4 col-sm-4  col-4">
                      <h5>Title</h5>
                      <p>{gameDetails.title}</p>
                      <h5>Release Date</h5>
                      <p>{gameDetails.release_date}</p>
                    </div>
                    <div className="col-md-4 col-sm-4  col-4">
                      <h5>Developer</h5>
                      <p>{gameDetails.developer}</p>
                      <h5>Genre</h5>
                      <p>{gameDetails.genre}</p>
                    </div>
                    <div className="col-md-4 col-sm-4 col-4 ">
                      <h5>Publisher</h5>
                      <p>{gameDetails.publisher}</p>
                      <h5>Platform</h5>
                      <p>{gameDetails.platform}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
