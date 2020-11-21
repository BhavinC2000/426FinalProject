import React from "react";
import ProjectDesc from "./ProjectDesc";


const Projects = (props) => {

    if (props.edit) {
        return (
            <div className="section">
                <h1>Projects</h1>
                <button onClick={(event) => props.handleAddClick(event, props.setList, props.list, {id: Date.now(), title: "", description: "", url: ""})}>Add</button>
                {props.list.map((project, i) => {
                    return (
                    <div key={project.id} className="container">
                        <div className="arrows">
                            <button onClick={(event) => props.moveUp(event, i, props.list, props.setList)}>↑</button>
                            <br/>
                            <button onClick={(event) => props.moveDown(event, i, props.list, props.setList)}>↓</button>
                        </div>
                        <div className="content">
                            <ProjectDesc
                                className="section"
                                titleHandler={(event) => props.handleFieldChange(event, props.list, i, "title")}
                                descriptionHandler={(event) => props.handleFieldChange(event, props.list, i, "description")}
                                urlHandler={(event) => props.handleFieldChange(event, props.list, i, "url")}
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
                {props.list.map((project) => {
                    return (
                        <div key={project.id} className="section">
                            <h2>{project.title}</h2>
                            <p className="description_saved">{project.description}</p>
                            <p>Link:<a href={project.url}>{project.url}</a></p>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Projects;