import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Game } from "./GameInterface";
export let GamesContext: any = createContext(0);
export default function GamesContextProvider(props: any) {
  const [allGames, setallGames] = useState<Game[]>([]);
  const [gamesByPlatform, setgamesByPlatform] = useState<any>([]);
  const [gamesBySort, setgamesBySort] = useState<any>([]);
  const [gamesByCategory, setgamesByCategory] = useState<any>([]);
  async function getAllGames() {
    let { data } = await axios.get(
      "https://free-to-play-games-database.p.rapidapi.com/api/games",
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setallGames(data);
  }
  async function getGamesByPlatform(platform: string) {
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setgamesByPlatform(data);
    console.log(data);
  }
  async function getGamesBySort(type: string) {
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${type}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setgamesBySort(data);
    console.log(data);
  }
  async function getGamesByCategory(type: string) {
    let { data } = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    setgamesByCategory(data);
    console.log(data);
  }
  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <GamesContext.Provider
        value={{
          allGames,
          getAllGames,
          gamesByPlatform,
          getGamesByPlatform,
          gamesBySort,
          getGamesBySort,
          getGamesByCategory,
          gamesByCategory,
        }}
      >
        {props.children}
      </GamesContext.Provider>
    </>
  );
}
