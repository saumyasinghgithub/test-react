// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerSuccess,
  clearMessage,
  loginUser,
  registerUser,
} from "../actions/authActions";

const LoginOLD = () => {
  const dispatch = useDispatch();
  const registrationSuccess = useSelector((state) => state.registrationSuccess);
  const errorMessage = useSelector((state) => state.errorMessage);
  const successMessage = useSelector((state) => state.successMessage);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [userdata, setUserdata] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleLogin = () => {
    dispatch(loginUser(credentials));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(userdata));
  };

  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const toggleForm = (event) => {
    event.preventDefault();
    setIsRegisterForm(!isRegisterForm);
  };

  if (registrationSuccess && successMessage) {
    setTimeout(() => {
      dispatch(clearMessage()); // Clear the success message after a delay
    }, 5000); // Clear after 5 seconds
  }

  return (
    <div className="login-page">
      <div className="form">
        {isRegisterForm ? (
          <div className="login-form">
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <button onClick={handleLogin}>Login</button>
            <p className="message">
              Not registered? <a onClick={toggleForm}>Create an account</a>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <h1>Register</h1>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            <input
              type="email"
              placeholder="email"
              value={userdata.email}
              onChange={(e) =>
                setUserdata({ ...userdata, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Username"
              value={userdata.username}
              onChange={(e) =>
                setUserdata({ ...userdata, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={userdata.password}
              onChange={(e) =>
                setUserdata({ ...userdata, password: e.target.value })
              }
            />
            <button onClick={handleRegister}>Register</button>
            <p className="message">
              Already registered? <a onClick={toggleForm}>Sign In</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

//export default Login;
export default LoginOLD;
