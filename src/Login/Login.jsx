import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import registerImg from "../imgs/gaming-ebaf2ffc84f4451d.jpg";
import logo from "../imgs/logo.png";
import $ from "jquery";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";

export default function Login() {
  const [joiError, setJoiError] = useState(null);
  const [apiErrors, setapiErrors] = useState(null);
  const [submitJoiErrors, setsubmitJoiErrors] = useState(null);
  const { getUser } = useContext(UserContext);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [loader, setloader] = useState(false);
  const schema = Joi.object({
    password: Joi.string().min(5).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  const navigate = useNavigate();
  function validateUser(e) {
    let user = { ...userData };
    user[e.target.name] = e.target.value;
    const { error } = schema.validate(user, { abortEarly: false });

    // console.log(error.details[0].context.label);

    error ? setJoiError(error.details) : setJoiError(null);

    setuserData(user);
    // console.log(joiError);
    // error ? setJoiError(error) : "";
    // console.log(error?.details);
  }
  async function sendUserToApi(user) {
    setloader(true);
    $(".btn.btn-dark").addClass("disabled");
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signin",
      user
    );
    if (data.message != "success") {
      setloader(false);
      $(".btn.btn-dark").removeClass("disabled");
      setapiErrors([data.message]);
      console.log(data.message);
    } else {
      setloader(false);
      $(".btn.btn-dark").removeClass("disabled");
      // console.log(data.token);
      // send token to local storage
      localStorage.setItem("user", data.token);
      // getuser updates the state of the user in userContext (you'll need it to change the state of nav bar after login)
      getUser();
      navigate("/home");
    }
  }
  function submitUser(e) {
    e.preventDefault();
    $(
      ".joiErrors.alert.alert-danger.alert-dismissible.w-50.me-2.opacity-75 "
    ).show();
    if (!joiError) {
      //send user to back end

      sendUserToApi(userData);
    } else {
      setsubmitJoiErrors(joiError);
      console.log(joiError);
      //display errors
    }
  }
  function dismissErrors(e) {
    $(e.target).hide(500);
  }

  return (
    <>
      <div className="registerCard vh-100 ">
        <div className="ErrorWraper position-fixed fixed-bottom w-50">
          {submitJoiErrors
            ? submitJoiErrors.map((item, i) => (
                <div
                  className="joiErrors alert alert-danger alert-dismissible   me-2  opacity-75 pointer"
                  onClick={dismissErrors}
                  key={i}
                >
                  {item.message}
                </div>
              ))
            : ""}
          {apiErrors
            ? apiErrors.map((item, i) => (
                <div
                  className="joiErrors alert alert-danger alert-dismissible w-50  me-2  opacity-75 pointer"
                  onClick={dismissErrors}
                  key={i}
                >
                  {item}
                </div>
              ))
            : ""}
        </div>
        <div className="container">
          <div className="row g-0  align-items-stretch   ">
            <div className="col-md-6   mt-5 d-none d-md-block bg-info ">
              <img src={registerImg} alt="Game Img" className="w-100  " />
            </div>
            <div className="col-md-6 mt-5 right-card  ">
              <form onSubmit={submitUser} className=" right-card px-3 ">
                <div className="img-wrap mt-2 text-center ">
                  <img src={logo} alt="" className=" w-25" />
                </div>
                <h3 className="text-muted my-3 text-center">
                  Log in to GameOver
                </h3>

                <div className="position-relative my-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    className="form-control bg-dark text-white "
                    onChange={validateUser}
                  />
                  {joiError ? (
                    joiError.filter((item) => item.context.label == "email")
                      .length == 1 ? (
                      <span className="w-100  validation-strip d-block position-absolute bottom-0 start-0"></span>
                    ) : (
                      <span className="w-100 bg-success d-block  validation-strip position-absolute bottom-0 start-0"></span>
                    )
                  ) : (
                    ""
                  )}
                </div>

                <div className="position-relative my-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your password"
                    className="form-control bg-dark text-white "
                    onChange={validateUser}
                  />
                  {joiError ? (
                    joiError.filter((item) => item.context.label == "password")
                      .length == 1 ? (
                      <span className="w-100  validation-strip d-block position-absolute bottom-0 start-0"></span>
                    ) : (
                      <span className="w-100 bg-success d-block  validation-strip position-absolute bottom-0 start-0"></span>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <button className=" btn btn-dark  d-block w-100  ">
                  {loader ? (
                    <i className=" fa fa-spinner fa-spin "></i>
                  ) : (
                    " Login"
                  )}
                </button>

                <div className="hrLine w-100 "></div>
                <p className="text-muted text-center my-2 fs-6 ">
                  <Link to="/register" className="  text-muted text-info">
                    Forgot Password?
                  </Link>
                  <br />
                  Not a member yet?
                  <Link to="/register" className="  text-muted text-info">
                    Create Account{" "}
                    <i className="fa-solid fa-greater-than fw-light"></i>{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
