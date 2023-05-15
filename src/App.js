import "./App.css";
import { auth, db } from "./Firebase/init";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [Logged, setLog] = useState(false);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoad(false);
      if (user) {
        setUser(user);
        setLog(true);
      }
    });
  }, []);

  function createPost() {
    const post = {
      title: "Finish Frontend Simplified",
      description: "Land a 500k job",
      uid: user.uid
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getPosts() {
    const { docs } = await getDocs(collection(db, "posts"))
    const data = docs.map(elem => ({...elem.data(), id: elem.id}))
    console.log(data)
  }

  async function getPostById(Id) {
    const docRef = doc(db, "posts", Id )
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }

  async function getPostByUid() {
    const collectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(collectionRef);
    const post = docs.map(elem => elem.data())
    console.log(post)
  }

  async function updatePost() {
    const HCID = "2XXfGUFwfum9rHxzZhDl"
    const docRef = doc(db, "posts", HCID )
    const post = await getPostById(HCID)
    const newPost = {
      ...post,
      title: "land a 600k job"
    }
    updateDoc(docRef, newPost)
  }

  function deletePost() {
    const HCID = "2XXfGUFwfum9rHxzZhDl"
    const docRef = doc(db, "posts", HCID )
    deleteDoc(docRef)
  }

  function register() {
    createUserWithEmailAndPassword(
      auth,
      "achrafdaimallah2003@gmaill.com",
      "123456"
    )
      .then(({ user }) => {
        setUser(user);
        setLog(true);
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
        setLog(true);
      })
      .catch(() => {
        alert("wrong email or password");
      });
  }

  function logOut() {
    signOut(auth);
    setLog(false);
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
                {!Logged ? (
                  <>
                    <button onClick={register}>Register</button>{" "}
                    <button onClick={logIn}>Log In</button>
                  </>
                ) : (
                  <>
                    <button className="logout" onClick={logOut}>
                      Log Out
                    </button>
                    <button onClick={createPost}>Create Post</button>
                    <button onClick={getPosts}>Get Posts</button>
                    <button onClick={getPostById}>Get Post By Id</button>
                    <button onClick={getPostByUid}>Get Post By Uid</button>
                    <button onClick={updatePost}>Update Post</button>
                    <button onClick={deletePost}>Delete Post</button>
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
