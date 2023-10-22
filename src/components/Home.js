import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { registerUser,userLogin } from "../features/auth/authActions";

const Home = () => {
  const [customError, setCustomError] = useState(null);
  const [errorMessageTimeout, setErrorMessageTimeout] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userInfo);
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/products");
    // redirect user to login page if registration was successful
    if (success) navigate("/");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // clear any previous custom error message
    setCustomError(null);

    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");

      // Automatically clear the custom error message after 5 seconds
      const timeout = setTimeout(() => {
        setCustomError(null);
      }, 3000);

      // Save the timeout ID to clear it if needed
      setErrorMessageTimeout(timeout);

      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };
  useEffect(() => {
    // Clear the custom error message when a new error is received
    if (error) {
      setCustomError(null);
    }
  }, [error]);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const toggleForm = (event) => {
    event.preventDefault();
    setIsRegisterForm(!isRegisterForm);
  };
  const submitFormLogin = (data) => {
    dispatch(userLogin(data))
  }
  return (
    <div className="login-page">
      <div className="form">
        {isRegisterForm ? (
          <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submitFormLogin)}>
              {error && <Error>{error}</Error>}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="username"
                  className="form-input"
                  {...register("username")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  {...register("password")}
                  required
                />
              </div>
              <button type="submit" className="button" disabled={loading}>Login</button>
            </form>
            <p className="message">
              Not registered? <a onClick={toggleForm}>Create an account</a>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(submitForm)}>
              {error && <div className="error-message">{error}</div>}
              {customError && (
                <div className="error-message">{customError}</div>
              )}
              <input
                type="text"
                placeholder="Username"
                className="form-input"
                {...register("username")}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                {...register("email")}
                required
              />
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                {...register("password")}
                required
              />
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                required
              />
              <button type="submit" className="button" disabled={loading}>
                Register
              </button>
              <p className="message">
                Already registered? <a onClick={toggleForm}>Sign In</a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
