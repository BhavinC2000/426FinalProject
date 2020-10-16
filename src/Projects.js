import React, {useState} from "react";
import ProjectDesc from "./ProjectDesc";


const Projects = (props) => {

    const [inputList, setInputList] = useState([]);

    const handleAddClick = (event) => {
        setInputList([...inputList, {id: Date.now(), title: "", description: ""}]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleTitleChange = (event, index) => {
        inputList[index]["title"] = event.target.value;
    }

    const handleDescriptionChange = (event, index) => {
        inputList[index]["description"] = event.target.value;
    }

    const moveUp = (event, index) => {
        if (index !== 0) {
            const list = [...inputList];
            let temp = list[index];
            list[index] = list[index-1];
            list[index - 1] = temp;
            setInputList(list);
        }
    }
    
    const moveDown = (event, index) => {
        if (index !== inputList.length - 1) {
            const list = [...inputList];
            let temp = list[index];
            list[index] = list[index+1];
            list[index + 1] = temp;
            setInputList(list);
        }
    }

    if (props.edit) {
        return (
            <div className="section">
                <h1>Projects</h1>
                <button onClick={handleAddClick}>Add</button>
                {inputList.map((job, i) => {
                    return (
                    <div key={job.id} className="container">
                        <div className="arrows">
                            <button onClick={(event) => moveUp(event, i)}>Up</button>
                            <br/>
                            <button onClick={(event) => moveDown(event, i)}>Down</button>
                        </div>
                        <div className="content">
                            <ProjectDesc
                                className="section"
                                titleHandler={(event) => handleTitleChange(event, i)}
                                descriptionHandler={(event) => handleDescriptionChange(event, i)}
                                clickHandler={(event) => handleRemoveClick(event, i)}
                                defVal={inputList[i]}/>
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
                {inputList.map((job) => {
                    return (
                        <div key={job.id} className="section">
                            <h3>{job.title}</h3>
                            <h4>{job.description}</h4>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Projects;