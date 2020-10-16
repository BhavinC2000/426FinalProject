import React, {useState} from "react";
import Skills from "./Skills";


const Profile = (props) => {

    const [picState, setPicState] = useState({file:'', imagePreviewUrl: ''});

    const [name, setName] = useState({firstname: '', lastname: ''});

    const [skills, setSkills] = useState([]);

    const _handleSubmit = (e) => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    
    const _handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    

        if (file == null) {
            return;
        }

        reader.onloadend = () => {
          setPicState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        
        reader.readAsDataURL(file)
      }

    let $imagePreview = null;

    if (picState.imagePreviewUrl) {
    $imagePreview = (<img className="picture" src={picState.imagePreviewUrl} alt={picState.imagePreviewUrl}/>);
    } else {
    $imagePreview = (<img src="./blank.png" alt="Add profile pic"/>);
    }

    const changeFirstName = (event) => {
        setName({firstname: event.target.value, lastname: name.lastname});
    }

    const changeLastName = (event) => {
        setName({firstname: name.firstname, lastname: event.target.value});
    }

    const handleAddClick = () => {
        setSkills([...skills, {skill: '', id: Date.now()}]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...skills];
        list.splice(index, 1);
        setSkills(list);
    }

    const handleChange = (event, i) => {
        skills[i]["skill"] = event.target.value;
    }

    if (props.edit) {
        return (
            <div className="section">
                <h1>Profile</h1>
                <div>
                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                </div>
                <form onSubmit={(e)=>_handleSubmit(e)}>
                    <input className="fileInput" 
                        type="file" 
                        defaultValue={picState.file}
                        onChange={(e)=>_handleImageChange(e)} />
                </form>
                <br/>
                <br/>
                <label>First Name: </label>
                <input onChange={changeFirstName} defaultValue={name.firstname} />
                <br/>
                <br/>
                <label>Last Name: </label>
                <input onChange={changeLastName} defaultValue={name.lastname} />
                <br/>
                <br/>
                <h4>Skills</h4>
                <button onClick={handleAddClick}>Add</button>
                {skills.map((skill, i) => {
                    return (
                        <div key={skill.id}>
                            <Skills 
                                changeHandler={(event) => handleChange(event, i)}
                                removeHandler={(event) => handleRemoveClick(event, i)}
                                />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="section">
                <h1>Profile</h1>
                <div>
                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                    <h2>Name: {name.firstname} {name.lastname}</h2>
                    <h4>Skills:</h4>
                    {skills.map((skill) => {
                        return (
                            <div key={skill.id}>
                                <h4>{skill.skill}</h4>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}

export default Profile;