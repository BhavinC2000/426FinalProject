import React from "react";
import Skills from "./Skills";


const Profile = (props) => {

    if (props.edit) {
        return (
            <div className="section">
                <h1>Profile</h1>
                <div>
                    <div className="imgPreview">
                        <img className="picture" src={props.picState} alt={props.picState ? props.picState : "Add profile pic"}/>
                    </div>
                </div>
                    <input className="fileInput" 
                        type="file"
                        onChange={(e)=>props.handleImageChange(e)} />
                <br/>
                <br/>
                <label>First Name: </label>
                <input onChange={(event) => props.changeFirstName(event)} defaultValue={props.name.firstname} />
                <br/>
                <br/>
                <label>Last Name: </label>
                <input onChange={(event) => props.changeLastName(event)} defaultValue={props.name.lastname} />
                <br/>
                <br/>
                <h4>Skills</h4>
                <button onClick={(event) => props.handleAddClick(event, props.setSkills, props.skills, {skill: '', id: Date.now()})}>Add</button>
                {props.skills.map((skill, i) => {
                    return (
                        <div key={skill.id}>
                            <Skills
                                defVal={props.skills[i]}
                                changeHandler={(event) => props.handleFieldChange(event, props.skills, i, "skill")}
                                removeHandler={(event) => props.handleRemoveClick(event, i, props.skills, props.setSkills)}
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
                    <img className="picture" src={props.picState} alt={props.picState ? props.picState : "Add profile pic"}/>
                    </div>
                    <h2>Name: {props.name.firstname} {props.name.lastname}</h2>
                    <h4>Skills:</h4>
                    {props.skills.map((skill) => {
                        return (
                            <div key={skill.id}>
                                <h4 className="skill">{skill.skill}</h4>
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