import React from "react";


const Posting = (props) => {
    return (
        <div className="section" key={props.job.id}>
            <div className="job_posting">
              <h1>Company: {props.job.company}</h1>
              <img className="logo" src={props.job.company_logo} alt={props.job.company + " Logo"}></img>
              <a href={props.job.url}>Link to Posting</a>
            </div>
            <div dangerouslySetInnerHTML={{__html: props.job.description}} />
        </div>
    )
}

export default Posting;