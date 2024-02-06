import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import LogIcon from "../../assets/images/icons/log.svg";
import PassIcon from "../../assets/images/icons/pass.svg";
import http from "../../axios.config";
import useToken from "../../Hooks/useToken";

function Login({ requestData }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [, setToken] = useToken();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      admin_email: name.trim(),
      admin_password: password.trim(),
    };
    http
      .post("/admin/login", requestData)
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("user_email", response.data.data.admin_email);
          setToken(response.data.token);
          setErr(false);
          navigate("/");
        } else {
          setErr(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_wrapper">
          <h2 className="login_title">Login to admin</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <img src={LogIcon} alt="" />
              <input
                className={
                  err ? "login_input login_input--danger" : "login_input"
                }
                required
                type="text"
                placeholder="Login"
                id="login"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <img src={PassIcon} alt="" />
              <input
                className={
                  err ? "login_input login_input--danger" : "login_input passwor_input"
                }
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i
                    className="fa-solid fa-eye"
                    style={{ cursor: "pointer" }}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-eye-low-vision"
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
