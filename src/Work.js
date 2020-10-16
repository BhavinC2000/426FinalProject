import React, {useState} from "react";
import Job from "./Job";

const Work = (props) => {

    const [inputList, setInputList] = useState([]);

    const handleAddClick = (event) => {
        setInputList([...inputList, {id: Date.now(), company: "", position: "", description: "", }]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleCompanyChange = (event, index) => {
        inputList[index]["company"] = event.target.value;
    }

    const handlePositionChange = (event, index) => {
        inputList[index]["position"] = event.target.value;
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
                <h1>Work Experience</h1>
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
                            <Job 
                                className="section"
                                clickHandler={(event) => handleRemoveClick(event, i)}
                                companyHandler={(event) => handleCompanyChange(event, i)}
                                positionHandler={(event) => handlePositionChange(event, i)}
                                descriptionHandler={(event) => handleDescriptionChange(event, i)}
                                defVal={inputList[i]} />
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
                {inputList.map((job) => {
                    return (
                        <div key={job.id} className="section">
                            <h3>{job.company}</h3>
                            <h4>{job.position}</h4>
                            <h4>{job.description}</h4>
                        </div>
                    )
                })
                }

                
            </div>
        )
    }

}

export default Work;