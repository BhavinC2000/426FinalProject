import React, {useState} from 'react';
import './App.css';
import Work from "./Work";
import Activities from "./Activities";
import Projects from "./Projects";
import Profile from "./Profile";
import Button from './Button';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCTjnjjD_pvjUKqx-YuqO4nHx0MdwMGmX0",
  authDomain: "comp426-final-3da5e.firebaseapp.com",
  databaseURL: "https://comp426-final-3da5e.firebaseio.com",
  projectId: "comp426-final-3da5e",
  storageBucket: "comp426-final-3da5e.appspot.com",
  messagingSenderId: "467209345613",
  appId: "1:467209345613:web:fe152bfe8a5053c7169a04",
  measurementId: "G-NJ17HP93GH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

  const [edit, setEdit] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);

  const changeLayout = (event) => {
    setEdit(!edit);
  }

  const logIn = (event) => {
    event.preventDefault();
    const email = document.getElementById("txtEmail");
    const pass = document.getElementById("txtPass");
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
    promise
      .catch(e => {
        let error = document.getElementById("error");
        error.classList.remove("hide");
        console.log(e.message)
      });
  }

  const signUp = (event) => {
    event.preventDefault();
    const email = document.getElementById("txtEmail");
    const pass = document.getElementById("txtPass");
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
    promise
      .catch(e => console.log(e.message));
  }

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  const logOut = (event) => {
    firebase.auth().signOut();
  }

  if (!loggedIn) {

    return (
      
      <form>

        <h4 id="error" className="err hide">Invalid Credentials</h4>
        <input id="txtEmail" className="sign-in" placeholder="Email"></input>
        <br/>
        <br/>
        <input id="txtPass" className="sign-in" placeholder="Password"></input>
        <br/>
        <br/>
        <button onClick={(event) => logIn(event)}>Log In</button>
        <button onClick={(event) => signUp(event)}>Sign Up</button>

      </form>
    );

  } else {

    return (
      <div>
        <div className="column left">
          <Profile edit={edit}/>
        </div>
        <div className="column right">
            <Work edit={edit}/>
            <Activities edit={edit}/>
            <Projects edit={edit}/>
            <Button edit={edit} handler={(event) => changeLayout(event)}/>
            <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    );

  }
}

export default App;
