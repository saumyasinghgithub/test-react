import React, { useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';

const Login = (props) => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const frmRef = useRef("RegisterForm");
  const toggleForm = (event) => {
    event.preventDefault();
    setIsRegisterForm(!isRegisterForm);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  return (
    <div className="login-page">
      <div className="form">
        {isRegisterForm ? (
          <form className="register-form" ref={frmRef} onSubmit={handleSubmit}>
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="email" placeholder="email address"/>
            <button type='submit'>create</button>
            <p className="message">
              Already registered? <a onClick={toggleForm}>Sign In</a>
            </p>
          </form>
        ) : (
          <form className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>login</button>
            <p className="message">
              Not registered? <a onClick={toggleForm}>Create an account</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
