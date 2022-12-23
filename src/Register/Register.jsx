import Joi from "joi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import registerImg from "../imgs/gaming-ebaf2ffc84f4451d.jpg";
import $ from "jquery";
import axios from "axios";
export default function Register() {
  const [joiError, setJoiError] = useState(null);
  const [apiErrors, setapiErrors] = useState(null);
  const [submitJoiErrors, setsubmitJoiErrors] = useState(null);
  // let { userData, setuserData } = useContext(UserContext);
  const [userData, setuserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    password: "",
  });

  const [loader, setloader] = useState(false);
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(10),
    last_name: Joi.string().min(3).max(10),
    age: Joi.number().integer().max(80).min(18),
    password: Joi.string().alphanum().min(5).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  function validateUser(e) {
    let user = { ...userData };
    user[e.target.name] = e.target.value;
    const { error } = schema.validate(user, { abortEarly: false });

    // console.log(error.details[0].context.label);

    error ? setJoiError(error.details) : setJoiError(null);

    setuserData(user);
    console.log(joiError);
    // error ? setJoiError(error) : "";
    // console.log(error?.details);
  }
  async function sendUserToApi(user) {
    setloader(true);
    $(".btn.btn-dark").addClass("disabled");
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signup",
      user
    );
    if (data.message != "success") {
      setloader(false);
      $(".btn.btn-dark").removeClass("disabled");
      setapiErrors([data.message]);
      console.log(apiErrors);
    } else {
      setloader(false);
      $(".btn.btn-dark").removeClass("disabled");
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
  useEffect(() => {
    console.log(userData);
  }, []);

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
                <h3 className="text-muted mt-4 text-center">
                  Create My Account!
                </h3>
                <div className="row g-2 mt-4">
                  <div className="from-group col-md-6  ">
                    <div className="position-relative">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="first Name"
                        className="form-control bg-dark text-white "
                        onChange={validateUser}
                      />
                      {/* {joiError ? (
                        joiError[0].context.label == "first_name" ? (
                          <span className="w-100  validation-strip d-block position-absolute bottom-0 start-0"></span>
                        ) : (
                          <span className="w-100 bg-success d-block  validation-strip position-absolute bottom-0 start-0"></span>
                        )
                      ) : (
                        ""
                      )} */}
                      {joiError ? (
                        joiError.filter(
                          (item) => item.context.label == "first_name"
                        ).length == 1 ? (
                          <span className="w-100  validation-strip d-block position-absolute bottom-0 start-0"></span>
                        ) : (
                          <span className="w-100 bg-success d-block  validation-strip position-absolute bottom-0 start-0"></span>
                        )
                      ) : (
                        ""
                      )}

                      {/* {joiError ? joiError.details[0].message : ""} */}
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <div className="position-relative">
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        className="form-control bg-dark text-white "
                        onChange={validateUser}
                      />
                      {joiError ? (
                        joiError.filter(
                          (item) => item.context.label == "last_name"
                        ).length == 1 ? (
                          <span className="w-100  validation-strip d-block position-absolute bottom-0 start-0"></span>
                        ) : (
                          <span className="w-100 bg-success d-block  validation-strip position-absolute bottom-0 start-0"></span>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
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
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter Your age"
                    className="form-control bg-dark text-white "
                    onChange={validateUser}
                  />
                  {joiError ? (
                    joiError.filter((item) => item.context.label == "age")
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
                    " Create Account"
                  )}
                </button>
                <p className="text-muted text-center my-2 fs-6 ">
                  This site is protected by reCAPTCHA and the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="  text-muted"
                  >
                    Google Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    className="  text-muted"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
                <div className="hrLine w-100 "></div>
                <p className="text-muted text-center">
                  Already a member?
                  <Link to="/login" className=" text-info">
                    Log In
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
