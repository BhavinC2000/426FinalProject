import React, {useState} from "react";


const Skills = () => {

    const [skillsList, setSkillsList] = useState([]);

    const handleAddClick = (event) => {
        setSkillsList([...skillsList, {skill: '', id: Date.now()}]);
    }

    const handleRemoveClick = (event, index) => {
        const list = [...skillsList];
        list.splice(index, 1);
        setSkillsList(list);
    }

    const handleChange = (event, i) => {
        skillsList[i]["skill"] = event.target.value;
    }

    return (
        <div>
            <h4>Skills</h4>
            <button onClick={handleAddClick}>Add</button>
            {skillsList.map((job, idx) => {
                return (
                <div key={job.id}>
                    <input onChange={(event) => handleChange(event, idx)}/>
                    <button onClick={(event) => handleRemoveClick(event, idx)}>Remove</button>
                </div>
                )
            }

            )}
        </div>
    )

}

export default Skills;