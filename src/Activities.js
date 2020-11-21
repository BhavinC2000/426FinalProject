import React from "react";
import Activity from "./Activity";

const Activities = (props) => {


    if (props.edit) {
        return (
            <div className="section">
                <h1>Leadership/Activities</h1>
                <button onClick={(event) => props.handleAddClick(event, props.setList, props.list, {id: Date.now(), organization: "", position: "", description: "", })}>Add</button>
                {props.list.map((job, i) => {
                    return (
                    <div key={job.id} className="container">
                        <div className="arrows">
                            <button onClick={(event) => props.moveUp(event, i, props.list, props.setList)}>↑</button>
                            <br/>
                            <button onClick={(event) => props.moveDown(event, i, props.list, props.setList)}>↓</button>
                        </div>
                        <div className="content">
                            <Activity
                                className="section"
                                clickHandler={(event) => props.handleRemoveClick(event, i, props.list, props.setList)}
                                orgHandler={(event) => props.handleFieldChange(event, props.list, i, "organization")}
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
                <h1>Leadership/Activities</h1>
                {props.list.map((job) => {
                    return (
                        <div key={job.id} className="section">
                            <h2 className="title">{job.organization}</h2>
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

export default Activities;