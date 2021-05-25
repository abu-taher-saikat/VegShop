import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../../Resources/logo2.png";
// import "./Login.css";

const Login = () => {
  // states
  const [submit, setSubmit] = useState("sign in");

  return (
    <div className="login  container-fluid main-section">
      <div className="row">
        <div className="border p-5 col-7 m-auto">
          <form>
            {submit === "sign in" ? (
              <div>
                <input
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px 0px",
                    width: "100%",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="First name"
                />
                <input
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px 0px",
                    width: "100%",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="Last name"
                />
                <input
                  style={{ width: "100%" }}
                  className="btn btn-custome"
                  type="submit"
                />
                <div className="mt-2 row px-3">
                  <div className="col-6">
                    <button
                      style={{ width: "100%" }}
                      className="mr-1 btn btn-custome1"
                    >
                      Google
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      style={{ width: "100%" }}
                      className="ml-1 btn btn-custome1"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <input
                  style={{
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px",
                    width: "100%",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="First name"
                />
                <input
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="Last name"
                />
                <input
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="Email"
                />
                <input
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "5px",
                    background: "white",
                    margin: "10px",
                    border: "1px solid #9ac100",
                  }}
                  placeholder="Password"
                />
                <input
                  style={{ width: "100%" }}
                  className=" btn-custome"
                  type="submit"
                />
              </div>
            )}
          </form>
          <div className="mt-2 row px-3">
            <div className="col-6">
              <button
                style={{ width: "100%" }}
                className="mr-1 mt-2 text-primary  btn-custome"
                onClick={() => setSubmit("sign up")}
              >
                Sign up
              </button>
            </div>
            <div className="col-6">
              <button
                style={{ width: "100%" }}
                className="ml-1  mt-2 text-primary btn-custome"
                onClick={() => setSubmit("sign in")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
