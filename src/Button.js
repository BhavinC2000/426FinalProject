import React from "react";


const Button= (props) => {

    if (props.edit) {
        return (<button onClick={props.handler}>Save</button>);
    } else {
        return (<button onClick={props.handler}>Edit</button>);
    }

}

export default Button;