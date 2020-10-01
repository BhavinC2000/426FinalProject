import React, {useState} from "react";
import Job from "./Job";


const Projects = () => {

    const [inputList, setInputList] = useState([]);

    const handleAddClick = (event) => {
        setInputList([...inputList, {company: "", position: ""}]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    return (
        <div className="section">
            <h1>Projects</h1>
            <button onClick={handleAddClick}>Add</button>
            {inputList.map((job, i) => {
                return (
                <div>
                    <Job handler={() => handleRemoveClick(i)}/>
                </div>
                )
            }

            )}
        </div>
    )

}

export default Projects;