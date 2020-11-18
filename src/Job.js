import React from "react";


const Job = (props) => {

    return (
        <div className={props.className}>
            <label>Company Name:</label>
            <br/>
            <input onChange={props.companyHandler} defaultValue={props.defVal.company}/>
            <br/>
            <br/>
            <label>Job Title: </label>
            <br/>
            <input onChange={props.positionHandler} defaultValue={props.defVal.position}/>
            <br/>
            <br/>
            <label>Job Description: </label>
            <br/>
            <textarea className="description" onChange={props.descriptionHandler} defaultValue={props.defVal.description}></textarea>
            <br/>
            <br/>
            <button onClick={props.clickHandler}>Remove</button>
        </div>
    )
}


export default Job;