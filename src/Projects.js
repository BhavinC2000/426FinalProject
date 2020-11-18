import React from "react";
import ProjectDesc from "./ProjectDesc";


const Projects = (props) => {

    if (props.edit) {
        return (
            <div className="section">
                <h1>Projects</h1>
                <button onClick={(event) => props.handleAddClick(event, props.setList, props.list, {id: Date.now(), title: "", description: "", })}>Add</button>
                {props.list.map((job, i) => {
                    return (
                    <div key={job.id} className="container">
                        <div className="arrows">
                        <button onClick={(event) => props.moveUp(event, i, props.list, props.setList)}>Up</button>
                            <br/>
                            <button onClick={(event) => props.moveDown(event, i, props.list, props.setList)}>Down</button>
                        </div>
                        <div className="content">
                            <ProjectDesc
                                className="section"
                                titleHandler={(event) => props.handleFieldChange(event, props.list, i, "title")}
                                descriptionHandler={(event) => props.handleFieldChange(event, props.list, i, "description")}
                                clickHandler={(event) => props.handleRemoveClick(event, i, props.list, props.setList)}
                                defVal={props.list[i]}/>
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
                <h1>Projects</h1>
                {props.list.map((job) => {
                    return (
                        <div key={job.id} className="section">
                            <h2>{job.title}</h2>
                            <p className="description_saved">{job.description}</p>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Projects;