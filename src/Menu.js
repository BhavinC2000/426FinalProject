import React from "react";
import FreeSolo from "./Autocomplete";

const Menu= (props) => {
    
    return (
        <div className="section">
            <button onClick={props.buttonHandler}>Home</button>
            <button onClick={props.getJobs}>Jobs</button>
            <FreeSolo 
                users={props.users}
                searchHandler={props.searchHandler}
                />
        </div>
    )
}

export default Menu;