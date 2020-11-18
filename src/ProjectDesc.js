import React from "react";


const ProjectDesc = (props) => {

    return (
        <div className={props.className}>
            <label>Project Title: </label>
            <br/>
            <input onChange={props.titleHandler} defaultValue={props.defVal.title}/>
            <br/>
            <br/>
            <label>Project Description: </label>
            <br/>
            <textarea className="description" onChange={props.descriptionHandler} defaultValue={props.defVal.description}></textarea>
            <br/>
            <br/>
            <button onClick={props.clickHandler}>Remove</button>
        </div>

    )
    
}

export default ProjectDesc;