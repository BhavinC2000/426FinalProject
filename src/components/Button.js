import React from "react";


const Button= (props) => {

    if (props.edit) {
        return (<button onClick={(event) => props.changeLayout(event)}>Save</button>);
    } else {
        return (<button onClick={(event) => props.changeLayout(event)}>Edit</button>);
    }

}

export default Button;