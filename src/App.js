import React, {useEffect, useState} from 'react';
import './App.css';
import Work from "./Work";
import Activities from "./Activities";
import Projects from "./Projects";
import Profile from "./Profile";
import Button from './Button';
import Menu from './Menu';
import Posting from './Posting';
import Firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/database"
import Axios from 'axios';

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
Firebase.initializeApp(firebaseConfig); 
const auth = Firebase.auth();
const storage = Firebase.storage();
const db = Firebase.database();


const App = () => {

  const [user, setUser] = useState(null);

  const [edit, setEdit] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [home, setHome] = useState(true);

  const [jobList, setJobList] = useState();
  // Work

  const [inputList, setInputList] = useState([]);

  // Projects

  const [projectList, setProjectList] = useState([]);

  // Profile

  const [picState, setPicState] = useState('');

  const [name, setName] = useState({firstname: '', lastname: ''});

  const [skills, setSkills] = useState([]);

  // Leadership

  const [leadershipList, setLeadershipList] = useState([]);

  // Filter

  const [lang, setLang] = useState('');

  let userMap = {};
  let users = []

  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      setUser(firebaseUser.uid);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setHome(true);
    }
  })

  useEffect(() => {
    db.ref("users/").once('value').then(function (doc) {
      let data = doc.val();
      for (const [key, value] of Object.entries(data)) {
        if (key !== user && key !== "null") {
          users.push(value.name.firstname + " " + value.name.lastname);
          userMap[value.name.firstname + " " + value.name.lastname] = key;
        }
      }
      users.sort();
    })
  }, );

  useEffect(() => {
    if (user) {
      db.ref("users/" + user).once('value').then(function (doc) {
        if (doc) {
          let data = doc.val();
          data.name ? setName(data.name) : setName({firstname: '', lastname: ''})
          data.work ? setInputList(data.work) : setInputList([]);
          data.leadership ? setLeadershipList(data.leadership) : setLeadershipList([]);
          data.projects ? setProjectList(data.projects) : setProjectList([]);
          data.skills ? setSkills(data.skills) : setSkills([]);
          data.picURL ? setPicState(data.picURL) : setPicState('')
          setEdit(false);
        }
      }).catch(function(error) {
        setInputList([]);
        setName({firstname: '', lastname: ''});
        setLeadershipList([]);
        setProjectList([]);
        setSkills([]);
        setPicState('')
        setEdit(true);
      })
    }
  }, [user])

  const changeLayout = (event) => {
    if (edit) {
      if (name.firstname === '' || name.lastname === '') {
        alert("Please input your first and last name before saving")
        return;
      }
      db.ref('users/' + user).set({
        name: name,
        work: inputList,
        leadership: leadershipList,
        projects: projectList,
        skills: skills,
        picURL: picState
      })
    }
    setEdit(!edit);
  }

  const logIn = (event) => {
    event.preventDefault();
    const email = document.getElementById("txtEmail");
    const pass = document.getElementById("txtPass");
    const promise = auth.signInWithEmailAndPassword(email.value, pass.value);
    promise
      .catch(e => {
        let error = document.getElementById("error");
        error.classList.remove("hide");
        error.innerHTML = e.message;
      });
  }

  const signUp = (event) => {
    event.preventDefault();
    const email = document.getElementById("txtEmail");
    const pass = document.getElementById("txtPass");
    const promise = auth.createUserWithEmailAndPassword(email.value, pass.value);
    promise
      .then(() => {
        storage
          .ref("profile_pics")
          .child("blank.png")
          .getDownloadURL()
          .then(url => {
            setPicState(url)
          });
        db.ref("users/" + user).set({
          name: name,
          work: inputList,
          leadership: leadershipList,
          projects: projectList,
          skills: skills,
          picURL: picState
        })
      })
      .catch(e => {
        let error = document.getElementById("error");
        error.classList.remove("hide");
        error.innerHTML = e.message;
      });
  }

  const logOut = (event) => {
    Firebase.auth().signOut();
  }

  const changeFirstName = (event) => {
    setName({firstname: event.target.value, lastname: name.lastname});
  }

  const changeLastName = (event) => {
    setName({firstname: name.firstname, lastname: event.target.value});
  }

  const goHome = async (event) => {
    if (!home) {
      db.ref("users/" + user).once('value').then(function (doc) {
        if (doc) {
          let data = doc.val();
          setName(data.name);
          data.work ? setInputList(data.work) : setInputList([]);
          data.leadership ? setLeadershipList(data.leadership) : setLeadershipList([]);
          data.projects ? setProjectList(data.projects) : setProjectList([]);
          data.skills ? setSkills(data.skills) : setSkills([]);
          data.picURL ? setPicState(data.picURL) : setPicState('')
          setEdit(false);
        }
      });
      setHome(true);
      setJobList();
    }
  }

  const search = (event, name) => {
    if (!edit) {
      db.ref("users/" + userMap[name]).once('value').then(function (doc) {
        if (doc) {
          let data = doc.val();
          setName(data.name);
          data.work ? setInputList(data.work) : setInputList([]);
          data.leadership ? setLeadershipList(data.leadership) : setLeadershipList([]);
          data.projects ? setProjectList(data.projects) : setProjectList([]);
          data.skills ? setSkills(data.skills) : setSkills([]);
          data.picURL ? setPicState(data.picURL) : setPicState('')
          setEdit(false);
        }
      });
      setHome(false);
      setJobList();
    } else {
      alert("Please save information");
    }
  }
  
  const _handleImageChange = (e) => {
    e.preventDefault();

    let file = e.target.files[0];


    if (file == null) {
        return;
    }

    let uploadTask = storage.ref(`profile_pics/${user}`).put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
      },
      () => {
        storage
          .ref("profile_pics")
          .child(user)
          .getDownloadURL()
          .then(url => {
            setPicState(url);
          });
      }
    );
  }

  // General Use Functions

  const handleAddClick = (event, setList, list, obj) => {
    setList([...list, obj]);
  }

  const handleRemoveClick = (event, index, inputList, setList) => {
    const list = [...inputList];
    list.splice(index, 1);
    setList(list);
  }

  const moveUp = (event, index, inputList, setList) => {
      if (index !== 0) {
          const list = [...inputList];
          let temp = list[index];
          list[index] = list[index-1];
          list[index - 1] = temp;
          setList(list);
      }
  }
  
  const moveDown = (event, index, inputList, setList) => {
      if (index !== inputList.length - 1) {
          const list = [...inputList];
          let temp = list[index];
          list[index] = list[index+1];
          list[index + 1] = temp;
          setList(list);
      }
  }

  const handleFieldChange = (event, list, index, key) => {
    list[index][key] = event.target.value;
  }

  const getJobs = async (event) => {
    if (!edit) {
      const result = await Axios({
        method: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`,
        params: {
          description: lang
        }
      });
      setJobList(result.data);
      setHome(false);
    } else {
      alert("Please save information");
    }
  }

  if (!loggedIn) {
    
    return (
      
      <form id="portal">

        <h4 id="error" className="err hide">Invalid Credentials</h4>
        <input id="txtEmail" className="sign-in" placeholder="Email"></input>
        <br/>
        <br/>
        <input type="password" id="txtPass" className="sign-in" placeholder="Password"></input>
        <br/>
        <br/>
      
        <button onClick={(event) => logIn(event)}>Log In</button>
        <button onClick={(event) => signUp(event)}>Sign Up</button>

      </form>
    );

  } else if (jobList) {
    return (
      <div>
        <Menu 
          buttonHandler={goHome}
          getJobs={getJobs()}
          searchHandler={search}
          users={users}
          />
        <div className="section">
          <h2>Filter(s):</h2>
          <div onChange={(event) => setLang(event.target.value)}>
            <input type="radio" value="java" name="lang" />Java
            <input type="radio" value="python" name="lang" />Python
            <input type="radio" value="html/css" name="lang" />HTML/CSS
            <input type="radio" value="javascript" name="lang" />JavaScript
            <input type="radio" value="sql" name="lang" />SQL
            <input type="radio" value="ruby" name="lang" />Ruby
          </div>
          <button onClick={getJobs}>Apply</button>
        </div>
        {jobList.map((job, i) => {
            return (
              <div key={i}>
                <Posting
                  job={job}
                  />
              </div>
            )
          })}
      </div>
    )
  } else {
      return (
        <div>
          <Menu 
            buttonHandler={goHome}
            getJobs={getJobs}
            searchHandler={search}
            users={users}
            />
          <div className="column left">
            <Profile 
              edit={edit}
              name = {name}
              skills = {skills}
              setSkills = {setSkills}
              picState={picState}
              handleImageChange={_handleImageChange}
              handleAddClick={handleAddClick}
              handleRemoveClick={handleRemoveClick}
              handleFieldChange={handleFieldChange}
              changeFirstName={changeFirstName}
              changeLastName={changeLastName}
              />
          </div>
          <div className="column right">
              <Work 
                edit={edit}
                list={inputList}
                setList={setInputList}
                handleAddClick={handleAddClick}
                moveUp={moveUp}
                moveDown={moveDown}
                handleRemoveClick={handleRemoveClick}
                handleFieldChange={handleFieldChange}
                />
              <Activities
                edit={edit}
                list={leadershipList}
                setList={setLeadershipList}
                handleAddClick={handleAddClick}
                moveUp={moveUp}
                moveDown={moveDown}
                handleRemoveClick={handleRemoveClick}
                handleFieldChange={handleFieldChange}
                />
              <Projects
                edit={edit}
                list={projectList}
                setList={setProjectList}
                handleAddClick={handleAddClick}
                moveUp={moveUp}
                moveDown={moveDown}
                handleRemoveClick={handleRemoveClick}
                handleFieldChange={handleFieldChange}
                />
              {home ? (<Button 
                edit={edit}
                changeLayout={changeLayout}/>
              ) : (
                null
              )}
              <button onClick={logOut}>Log Out</button>
          </div>
        </div>
      );
  }
}

export default App;