import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./Vis.css";

function Vis()
{
    const [currentStepData, setCurrentStepData] = useState(null);
    const [currentComment, setCurrentComment] = useState(null);
    const [currentStepProgress, setCurrentStepProgress] = useState(null);

    const stepUpdateProgress = ({ progress }) => {
        setCurrentStepProgress(progress);
    };

    const stepUpdateData = ({ data }) => {
        setCurrentStepData(data);
    };

    const stepUpdateComment = ({ data }) => {
        setCurrentComment(data);
    };
    
    return(
        <div className="page-container background-light">
            <div className="background-dark" style={{width: "100vw"}}>
                <div className="body-text" style={{position: "sticky", top: "25vh"}}>
                    {currentComment === null ? "Imagine." : currentComment}
                </div>

                <div className="background-dark" style={{width: "100vw"}}>
                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <div className="row-container large-text" style={{gap: "12pt"}}>
                        The
                        <div className="accent-text">
                            Impact
                        </div>
                        of Cyber Attacks
                    </div>

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"Imagine."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "50pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-dark-to-night" style={{height: "150pt", width: "100vw"}} />

                <div className="background-night" style={{width: "100vw"}}>
                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"In the dead of night."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"Returning from a long day at work."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "350pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"Logging on to your computer."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-night-to-screen" style={{height: "150pt", width: "100vw"}} />

                <div className="background-screen" style={{width: "100vw"}} >
                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"Logging into your bank account."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={"But it refused."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-screen-to-error" style={{height: "150pt", width: "100vw"}} />

                <div className="background-error" style={{width: "100vw"}} >
                    <div style={{height: "75pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((_, stepIndex) => (
                            <Step data={"Attempt " + stepIndex + "."} key={stepIndex}>
                                <div style={{height: (350 * ((21 - stepIndex) / 22)) + "pt", width: "100%"}}>&nbsp;</div>
                            </Step>
                        ))}
                        <Step data={"LOGIN FAILED"}>
                            <div style={{height: "750pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                        <Step data={"It's all gone."}>
                            <div style={{height: "350pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "500pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-error-to-dark" style={{height: "150pt", width: "100vw"}} />

                <div className="background-dark" style={{width: "100vw"}} >
                    <Scrollama offset={0.2} onStepEnter={stepUpdateComment}>
                        <Step data={""}>
                            <div style={{height: "90vh", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div className="body-text">
                        A chain is only as strong as its weakest link.
                    </div>
                    <div className="body-text">
                        No matter how strong your password is, the institutions must securely protect it.
                    </div>

                    <div style={{height: "72pt", width: "100%"}}>&nbsp;</div>

                    <div className="body-text">
                        rockyou.txt
                    </div>
                    <div className="body-text">
                        An iconic file generated from 32 million user accounts, created by one attack.
                    </div>
                    <div className="body-text">
                        Passwords easily stolen in plain view, stored unencrypted by the company.
                    </div>

                    <div style={{height: "72pt", width: "100%"}}>&nbsp;</div>

                    <div className="body-text">
                        That file was from 2009.
                    </div>
                    <div className="body-text">
                        Since then, cyber threats have evolved tremendously.
                    </div>

                    <div style={{height: "72pt", width: "100%"}}>&nbsp;</div>

                    <div className="row-container body-text" style={{gap: "4pt"}}>
                        It only takes one attack to
                        <div className="emphasis-body-text">
                            ruin you.
                        </div>
                    </div>
                </div>

                <div style={{height: "500pt", width: "100%"}}>&nbsp;</div>
            </div>
        </div>
    )
}

export default Vis;