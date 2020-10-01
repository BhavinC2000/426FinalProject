import React, {useState} from "react";


const Skills = () => {

    const [inputList, setInputList] = useState([]);

    const handleAddClick = (event) => {
        setInputList([...inputList, {skill: ''}]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleChange = (event, i) => {
        inputList[i]["skill"] = event.target.value;
    }

    return (
        <div>
            <h4>Skills</h4>
            <button onClick={handleAddClick}>Add</button>
            {inputList.map((job, i) => {
                return (
                <div>
                    <input onChange={() => handleChange(i)}/>
                </div>
                )
            }

            )}
        </div>
    )

}

export default Skills;