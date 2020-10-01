import React, {useState} from "react";


const Job = ({handler}) => {
    const [company, setCompany] = useState('');

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    return (
        <div className="section">
            <label>Company Name:</label>
            <input onChange={handleCompanyChange} defaultValue={company}/>
            <br/>
            <label>Job Title:</label>
            <input/>
            <br/>
            <button onClick={handler}>Remove</button>
        </div>
    )
}


export default Job;