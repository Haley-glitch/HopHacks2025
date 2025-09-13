import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./Vis.css";

function Vis()
{
    const [currentStepData, setCurrentStepData] = useState(null);

    const stepUpdate = ({ data }) => {
        setCurrentStepData(data);
    };
    
    return(
        <div className="page-container background-light">
            <Scrollama onStepEnter={stepUpdate} offset={0.1}>

                <div className="background-dark" style={{width: "100vw"}}>

                    <div height="25pt" width="100%" />

                    <div className="row-container large-text" style={{gap: "12pt"}}>
                        The
                        <div className="accent-text">
                            Impact
                        </div>
                        of Cyber Attacks
                    </div>

                    <div height="100pt" width="100%">&nbsp;</div>

                    <div className="body-text">
                        Imagine.
                    </div>

                    <div height="50pt" width="100%">&nbsp;</div>
                </div>

                <div className="background-dark-to-night" style={{height: "150pt", width: "100vw"}} />

                <div className="background-night" style={{width: "100vw"}}>
                    <div height="50pt" width="100%">&nbsp;</div>

                    <div className="body-text">
                        In the dead of night.
                    </div>

                    <div height="50pt" width="100%">&nbsp;</div>

                    <div className="body-text">
                        Returning from a long day of work.
                    </div>

                    <div height="50pt" width="100%">&nbsp;</div>
                </div>

                <div className="background-night-to-screen" style={{height: "150pt", width: "100vw"}} />

                <div height="5000pt" width="100%">&nbsp;</div>
            </Scrollama>
        </div>
    )
}

export default Vis;