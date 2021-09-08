import React from "react";
import './ChangePage.css'

const ChangePage =(props)=>{

    return <React.Fragment>
        <div className="prev-page-container">
            <div className="prev-page-div" onClick={props.prev}></div>
        </div>
        <div className="next-page-container">
            <div className="next-page-div" onClick={props.next}></div>
        </div>
        <div className="change-page-instructions">
            <h1 className="prev-page-instructions">Click anywhere on the left end of the screen to go to the previous page.</h1>
            <h1 className="next-page-instructions">Click anywhere on the right end of the screen to go to the next page.</h1>
        </div>
    </React.Fragment>
}

export default ChangePage;