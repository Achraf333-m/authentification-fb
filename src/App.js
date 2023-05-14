import { auth } from "./Firebase/init";
import "./App.css";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [notLogged, setLog] = useState(true);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoad(false);
      if (user) {
        setUser(user);
        setLog(false);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(
      auth,
      "achrafdaimallah2003@gmaill.com",
      "123456"
    )
      .then(({ user }) => {
        setUser(user);
        setLog(false);
      })
      .catch(() => {
        alert("email already in use");
      });
  }
  function logIn() {
    signInWithEmailAndPassword(auth, "achrafdaimallah2003@gmaill.com", "123456")
      .then(({ user }) => {
        console.log("Logged In");
        setUser(user);
        setLog(false);
      })
      .catch(() => {
        alert("wrong email or password");
      });
  }

  function logOut() {
    signOut(auth);
    setLog(true);
  }
  return (
    <>
      <nav>
        <div className="nav__container">
          <h1>LOGO INC.</h1>
          <div className="login__container">
            {loading ? (
              <>
                <button className="logout skeleton"></button>
                <button className="btn skeleton2"></button>
              </>
            ) : (
              <>
                {notLogged ? (
                  <>
                    <button onClick={register}>Register</button>{" "}
                    <button onClick={logIn}>Log In</button>
                  </>
                ) : (
                  <>
                    <button className="logout" onClick={logOut}>
                      Log Out
                    </button>
                    <button className="btn">
                      {user.email[0].toUpperCase()}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
