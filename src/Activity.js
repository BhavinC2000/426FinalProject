import React from "react";


const Activity = (props) => {

    return (
        <div className={props.className}>
            <label>Organization Name:</label>
            <br/>
            <input onChange={props.orgHandler} defaultValue={props.defVal.organization}/>
            <br/>
            <br/>
            <label>Position:</label>
            <br/>
            <input onChange={props.positionHandler} defaultValue={props.defVal.position}/>
            <br/>
            <br/>
            <label>Description: </label>
            <br/>
            <textarea className="description" onChange={props.descriptionHandler} defaultValue={props.defVal.description}></textarea>
            <br/>
            <br/>
            <button onClick={props.clickHandler}>Remove</button>
        </div>
    )
}


export default Activity;