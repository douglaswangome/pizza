import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { api } from "../routes/routes";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { notify } from "../utils/notify";

const Auth = () => {
  const [login, setLogin] = useState(true);

  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignIn((prevSignIn) => {
      return { ...prevSignIn, [name]: value };
    });
  };
  const handleSignIn = () => {
    if (signIn.email === "" || signIn.password === "") {
      notify(500, "Please enter your email and password");
      return;
    }
    signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then(() => notify(200, "Sign in successful"))
      .catch(() => notify(500, "Error signing in"));
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
  const handleSignUp = () => {
    if (
      signUp.name === "" ||
      signUp.email === "" ||
      signUp.password === "" ||
      signUp.confirmPassword === ""
    ) {
      notify(500, "Please fill all the fields");
      return;
    }
    createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCred) => {
        sendEmailVerification(userCred.user);
        const user = { name: signUp.name, email: signUp.email };
        api
          .post("/users/add", { user })
          .then((res) => notify(res.status, res.data.message));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleForgotPassword = () => {
    if (signIn.email === "") {
      notify(500, "Please enter your email address");
      return;
    }
    sendPasswordResetEmail(auth, signIn.email)
      .then(() => {
        notify(200, "Email sent successfully");
      })
      .catch((error) => {
        notify(500, "Error sending email, try again later!");
      });
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        const client = {
          name: userCred.user.displayName,
          email: userCred.user.email,
        };
        api
          .post("/users/add", { user: client })
          .then((res) => notify(res.status, res.data.message))
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
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
              <span className="forgot" onClick={handleForgotPassword}>
                Forgot Password
              </span>
              <button onClick={handleSignIn}>
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
              <button onClick={handleSignUp}>
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
        <hr className="h-line" />
        <div className="google">
          <button onClick={handleGoogle}>
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
