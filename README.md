# Documentation

## Create Method

Our "signUp" method performs a "Create" operation. 

```
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
```

When a person signs up a new account, the Firebase's "createUserWithEmailAndPassword" method creates a new user with a User ID. Following that, we create a new page in the database that corresponds to said user.

## Read Method

Our "goHome" and "search" methods perform a "Read" operation.

```
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
```

In both of these methods, when the main user chooses to view another profile or return to their home page (i.e. their website), we read the data on the associated database page and set the state of all variables to the corresponding information.

## Update Method

Our "save" method performs a "Update" operation.

```
const save = (event) => {
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
```

When a user chooses to save their personal website, we update the information on their database page to contain the most recently saved information.