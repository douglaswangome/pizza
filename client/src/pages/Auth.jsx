import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [login, setLogin] = useState(true);

  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignIn((prevSignIn) => {
      return { ...prevSignIn, [name]: value };
    });
  };

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUp((prevSignUp) => {
      return {
        ...prevSignUp,
        [name]: value,
      };
    });
  };

  return (
    <div className="auth">
      <div className="all">
        <Link to="/">
          <img src="/images/pizza-logo.png" alt="" />
        </Link>
        <div className="titles">
          <span
            className={`title ${login && "active"}`}
            onClick={() => setLogin(!login)}
          >
            Sign In
          </span>
          <span
            className={`title ${!login && "active"}`}
            onClick={() => setLogin(!login)}
          >
            Sign Up
          </span>
        </div>
        <div className="content">
          {login ? (
            <div className="login">
              <div>
                <span>Email:</span>
                <input
                  name="email"
                  value={signIn.email}
                  onChange={handleSignInChange}
                  type="email"
                />
              </div>
              <div>
                <span>Password:</span>
                <input
                  name="password"
                  value={signIn.password}
                  onChange={handleSignInChange}
                  type="password"
                />
              </div>
              <button>
                <span>Sign In</span>
              </button>
            </div>
          ) : (
            <div className="register">
              <div>
                <span>Name:</span>
                <input
                  name="name"
                  value={signUp.name}
                  onChange={handleSignUpChange}
                  type="text"
                />
              </div>
              <div>
                <span>Email:</span>
                <input
                  name="email"
                  value={signUp.email}
                  onChange={handleSignUpChange}
                  type="email"
                />
              </div>
              <div>
                <span>Password:</span>
                <input
                  name="password"
                  value={signUp.password}
                  onChange={handleSignUpChange}
                  type="password"
                />
              </div>
              <div>
                <span>Confirm Password:</span>
                <input
                  name="confirmPassword"
                  value={signUp.confirmPassword}
                  onChange={handleSignUpChange}
                  type="password"
                />
              </div>
              <button>
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
        <hr className="h-line" />
        <div className="google">
          <button>
            <img src="/images/google.png" alt="google" />
            <span>Continue with Google</span>
          </button>
        </div>
        <span>
          {`By Signing ${!login ? "Up" : "In"}, you agree to the terms and
          conditions.`}
        </span>
      </div>
    </div>
  );
};

export default Auth;
