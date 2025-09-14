import React, { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./Vis.css";
import TableauEmbed from "./components/TableauEmbed";
import Fig1 from "./assets/Fig1.png";
import Fig2 from "./assets/Fig2.png";
import Fig3 from "./assets/Fig3.png";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000, prefix = "", suffix = "", shouldAnimate }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

        let startTime;
        const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        };
        
        requestAnimationFrame(animate);
    }, [shouldAnimate, value, duration]);

    return (
        <span>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

function Vis() {
    const [currentStepData, setCurrentStepData] = useState(null);
    const [currentComment, setCurrentComment] = useState(null);
    const [currentStepProgress, setCurrentStepProgress] = useState(null);
    const [currentStepProgress1, setCurrentStepProgress1] = useState(null);
    const [currentStepProgress2, setCurrentStepProgress2] = useState(null);
    const [currentStepProgress3, setCurrentStepProgress3] = useState(null);

    const commentOffset = 0.45;

    const stepUpdateProgress = ({ progress }) => {
        setCurrentStepProgress(progress);
    };
    
    const stepUpdateProgress1 = ({ progress }) => {
        setCurrentStepProgress1(progress);
    };

    const stepUpdateProgress2 = ({ progress }) => {
        setCurrentStepProgress2(progress);
    };

    const stepUpdateProgress3 = ({ progress }) => {
        setCurrentStepProgress3(progress);
    };


    const stepUpdateData = ({ data }) => {
        setCurrentStepData(data);
    };

    const stepUpdateComment = ({ data }) => {
        setCurrentComment(data);
    };
    
    return(
        <div className="page-container" style={{background: "#FFFFFF"}}>
            <div className="background-dark" style={{width: "100vw"}}>
                <div className="body-text" style={{position: "sticky", top: "25vh"}}>
                    {currentComment === null ? "" : currentComment}
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

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"Imagine."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "50pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-dark-to-night" style={{height: "150pt", width: "100vw"}} />

                <div className="background-night" style={{width: "100vw"}}>
                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"In the dead of night."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"Returning from a long day at work."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "350pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"Logging on to your computer."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-night-to-screen" style={{height: "150pt", width: "100vw"}} />

                <div className="background-screen" style={{width: "100vw"}} >
                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"Logging into your bank account."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
                        <Step data={"But it refused."}>
                            <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-screen-to-error" style={{height: "150pt", width: "100vw"}} />

                <div className="background-error" style={{width: "100vw"}} >
                    <div style={{height: "75pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
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
                    <Scrollama offset={commentOffset} onStepEnter={stepUpdateComment}>
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

                    <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.9} onStepProgress={stepUpdateProgress1}>
                        <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                            <div className="accent-text large-text" style={{opacity: (currentStepProgress1)}}>
                                {" "}<AnimatedCounter value={299} prefix="" suffix="" shouldAnimate={true} />{" "}
                            </div>
                            <div className="medium-text" style={{opacity: (currentStepProgress1)}}>
                                large-scale attacks during 2024.
                            </div>
                        </div>
                        <Step data={""}>
                            <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.9} onStepProgress={stepUpdateProgress2}>
                        <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                            <div className="accent-text large-text" style={{opacity: (currentStepProgress2)}}>
                                {" "}<AnimatedCounter value={15.4} prefix="" suffix=" Billion" shouldAnimate={true} />{" "}
                            </div>
                            <div className="medium-text" style={{opacity: (currentStepProgress2)}}>
                                USD lost from cyber attacks during 2024.
                            </div>
                        </div>
                        <Step data={""}>
                            <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.9} onStepProgress={(stepUpdateProgress3)}>
                        <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                            <div className="accent-text large-text" style={{opacity: (currentStepProgress3)}}>
                                {" "}<AnimatedCounter value={153} prefix="" suffix=" Million" shouldAnimate={true} />{" "}
                            </div>
                            <div className="medium-text" style={{opacity: (currentStepProgress3)}}>
                                users impacted by cyber attacks during 2024.
                            </div>
                        </div>
                        <Step data={""}>
                            <div style={{height: "150pt", width: "100%"}}>&nbsp;</div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>

                    <div className="medium-text">
                        Learn More:
                    </div>

                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <div className="row-container">
                        <div className="col-container">
                            <button type="button" onClick={() => window.location.replace("/")} className="row-container background-radial-select" style={{ height: "auto", width: "20vw"}}>
                                <img src={Fig1} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                            <div className="body-text">
                                Ransomware
                            </div>
                        </div>

                        <div className="col-container">
                            <button type="button" onClick={() => window.location.replace("/")} className="row-container background-radial-select" style={{ height: "auto", width: "20vw"}}>
                                <img src={Fig2} />
                            </button>
                            <div className="body-text">
                                Phishing
                            </div>
                        </div>

                        <div className="col-container">
                            <button type="button" onClick={() => window.location.replace("/")} className="row-container background-radial-select" style={{ height: "auto", width: "20vw"}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={Fig3} />
                            </button>
                            <div className="body-text">
                                DDOS
                            </div>
                        </div>
                    </div>

                    <div style={{height: "250pt", width: "100%"}}>&nbsp;</div>
                </div>

                <div className="background-dark-to-vis" style={{height: "150pt", width: "100vw"}} />

                <div style={{background: "#FFFFFF"}}>
                    <TableauEmbed 
                        url="https://public.tableau.com/views/TrialRunonFinancialLossbyCountry/GeospacialDataFinancialLossbyCountry" 
                        width="90vw" 
                        height="700px" 
                        style={{opacity: 0.01}}
                    />
                </div>

                <div className="background-vis-to-dark" style={{height: "150pt", width: "100vw"}} />

                <div style={{height: "500pt", width: "100%"}} />
            </div>
        </div>
    );
}

export default Vis;
