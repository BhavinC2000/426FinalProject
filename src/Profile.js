import React, {useState} from "react";
import Skills from "./Skills";


const Profile = () => {

    const [picState, setPicState] = useState({file:'', imagePreviewUrl: ''});

    const [name, setName] = useState({firstname: '', lastname: ''});

    const _handleSubmit = (e) => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    
    const _handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
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
    $imagePreview = (<img id="container" src={picState.imagePreviewUrl} alt={picState.imagePreviewUrl}/>);
    } else {
    $imagePreview = (<img src="./blank.png" alt="Add profile pic"/>);
    }

    const changeFirstName = (event) => {
        setName({firstname: event.target.value, lastname: name.lastname});
    }

    const changeLastName = (event) => {
        setName({firstname: name.firstname, lastname: event.target.value});
    }

    return (
        <div className="section">
            <h1>Profile</h1>
            <container>
                <div className="imgPreview">
                {$imagePreview}
                </div>
            </container>
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
            <Skills />
        </div>
    )

}

export default Profile;