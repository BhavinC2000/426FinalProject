import React from "react";


const Skills = (props) => {


    return (
        <div>
            <input onChange={props.changeHandler} defaultValue={props.defVal.skill}/>
            <button onClick={props.removeHandler}>Remove</button>
        </div>
    )

}

export default Skills;