import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import { UserContext } from "../UserContext/UserContext";

export default function Nav() {
  const { user, setUser, getUser } = useContext<any>(UserContext);

  function signOut() {
    localStorage.removeItem("user");
    setUser(null);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <Link className="navbar-brand text-white " to="/">
            <img src={logo} alt="Logo" />
            Game Over
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 ">
                <li className="nav-item">
                  <Link
                    className="nav-link active "
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="games/all">
                    All
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Platfrom
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="games/platforms/pc">
                        PC
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="games/platforms/browser"
                      >
                        Browser
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/sort/release-date"
                      >
                        release-date
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/sort/popularity"
                      >
                        Popularity
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/sort/alphabetical"
                      >
                        alphabetical
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/sort/relevance"
                      >
                        relevance
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/sports"
                      >
                        Sports
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/shooter"
                      >
                        Shooter
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/open-world"
                      >
                        Open-world
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/zombie"
                      >
                        Zombie
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/fantasy"
                      >
                        Fantasy
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/action-rpg"
                      >
                        Action-rpg
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/action"
                      >
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/flight"
                      >
                        Flight
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/games/categories/battle-royale"
                      >
                        Battle-royal
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              ""
            )}
            {user ? (
              <form className="d-flex ms-auto" role="search">
                <Link
                  className="btn btn-outline-info"
                  type="submit"
                  to="/login"
                  onClick={signOut}
                >
                  Log Out
                </Link>
              </form>
            ) : (
              <form className="d-flex ms-auto" role="search">
                <Link
                  className="btn text-muted me-2 "
                  type="submit"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-info"
                  type="submit"
                  to="/register"
                >
                  Join Free
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
