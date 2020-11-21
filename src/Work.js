import React from "react";
import Job from "./Job";

const Work = (props) => {

    if (props.edit) {
        return (
            <div className="section">
                <h1>Work Experience</h1>
                <button onClick={(event) => props.handleAddClick(event, props.setList, props.list, {id: Date.now(), company: "", position: "", description: "", })}>Add</button>
                {props.list.map((job, i) => {
                    return (
                    <div key={job.id} className="container">
                        <div className="arrows">
                            <button onClick={(event) => props.moveUp(event, i, props.list, props.setList)}>↑</button>
                            <br/>
                            <button onClick={(event) => props.moveDown(event, i, props.list, props.setList)}>↓</button>
                        </div>
                        <div className="content">
                            <Job 
                                className="section"
                                clickHandler={(event) => props.handleRemoveClick(event, i, props.list, props.setList)}
                                companyHandler={(event) => props.handleFieldChange(event, props.list, i, "company")}
                                positionHandler={(event) => props.handleFieldChange(event, props.list, i, "position")}
                                descriptionHandler={(event) => props.handleFieldChange(event, props.list, i, "description")}
                                defVal={props.list[i]} />
                        </div>
                    </div>
                    )
                }

                )}
            </div>
        )
    } else {
        return (
            <div className="section">
                <h1>Work Experience</h1>
                {props.list.map((job) => {
                    return (
                        <div key={job.id} className="section">
                            <h2 className="title">{job.company}</h2>
                            <h3 className="position">{job.position}</h3>
                            <p className="description_saved">{job.description}</p>
                        </div>
                    )
                })
                }

                
            </div>
        )
    }

}

export default Work;