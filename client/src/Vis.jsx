import React, { useState, useEffect, useRef } from "react";
import { Scrollama, Step } from "react-scrollama";
import * as d3 from "d3";
import "./Vis.css";
import Fig1 from "./assets/Fig1.png";
import Fig2 from "./assets/Fig2.png";
import Fig3 from "./assets/Fig3.png";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 500, prefix = "", suffix = "", shouldAnimate }) => {
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

// D3 Cyber Attack Visualization Component
const CyberAttackViz = ({ attackType, isActive }) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current || !isActive) return;

        const svg = d3.select(svgRef.current);
        const container = d3.select(containerRef.current);
        const width = 600;
        const height = 400;

        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height);

        let cleanup = null;

        switch (attackType) {
            case "ddos":
                // DDoS Attack Visualization
                const nodes = d3.range(50).map(i => ({
                    id: i,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 8 + 2,
                    infected: i < 5 ? true : false
                }));

                const links = nodes.slice(0, 5).map(source => 
                    nodes.slice(5).map(target => ({ source, target }))
                ).flat();

                const simulation = d3.forceSimulation(nodes)
                    .force("link", d3.forceLink(links).id(d => d.id).distance(30))
                    .force("charge", d3.forceManyBody().strength(-100))
                    .force("center", d3.forceCenter(width / 2, height / 2));

                const link = svg.append("g")
                    .selectAll("line")
                    .data(links)
                    .enter().append("line")
                    .attr("stroke", "#ff4444")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.6);

                const node = svg.append("g")
                    .selectAll("circle")
                    .data(nodes)
                    .enter().append("circle")
                    .attr("r", d => d.r)
                    .attr("fill", d => d.infected ? "#ff4444" : "#00ff88")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5);

                let infectionTimer = setInterval(() => {
                    nodes.forEach(node => {
                        if (!node.infected && Math.random() > 0.95) {
                            node.infected = true;
                        }
                    });
                    
                    node.attr("fill", d => d.infected ? "#ff4444" : "#00ff88");
                    link.attr("stroke", d => d.source.infected || d.target.infected ? "#ff4444" : "#666");
                }, 200);

                simulation.on("tick", () => {
                    link
                        .attr("x1", d => d.source.x)
                        .attr("y1", d => d.source.y)
                        .attr("x2", d => d.target.x)
                        .attr("y2", d => d.target.y);

                    node
                        .attr("cx", d => d.x)
                        .attr("cy", d => d.y);
                });

                cleanup = () => {
                    clearInterval(infectionTimer);
                    simulation.stop();
                };
                break;

            case "phishing":
                // Phishing Attack Visualization
                const hookPath = svg.append("path")
                    .attr("d", `M ${width/2} 50 Q ${width/2 + 50} 150 ${width/2} 200`)
                    .attr("stroke", "#ff6b6b")
                    .attr("stroke-width", 3)
                    .attr("fill", "none");

                const hook = svg.append("circle")
                    .attr("cx", width/2)
                    .attr("cy", 200)
                    .attr("r", 8)
                    .attr("fill", "#ff6b6b");

                const packets = d3.range(20).map(i => ({
                    x: Math.random() * width,
                    y: -10,
                    caught: false,
                    id: i
                }));

                const packetElements = svg.selectAll(".packet")
                    .data(packets)
                    .enter().append("rect")
                    .attr("class", "packet")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
                    .attr("width", 15)
                    .attr("height", 10)
                    .attr("fill", "#4ecdc4")
                    .attr("rx", 2);

                const animatePackets = () => {
                    packets.forEach((packet, i) => {
                        if (!packet.caught) {
                            packet.y += 2;
                            const distance = Math.sqrt(
                                Math.pow(packet.x - width/2, 2) + 
                                Math.pow(packet.y - 200, 2)
                            );
                            if (distance < 30) {
                                packet.caught = true;
                                packet.x = width/2 - 7.5;
                                packet.y = 192;
                            }
                            if (packet.y > height) {
                                packet.y = -10;
                                packet.x = Math.random() * width;
                                packet.caught = false;
                            }
                        }
                    });

                    packetElements
                        .attr("x", d => d.x)
                        .attr("y", d => d.y)
                        .attr("fill", d => d.caught ? "#ff4444" : "#4ecdc4");
                };

                const packetTimer = setInterval(animatePackets, 50);
                cleanup = () => clearInterval(packetTimer);
                break;

            case "ransomware":
                // Ransomware Visualization
                const fileGrid = [];
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 6; j++) {
                        fileGrid.push({
                            x: 50 + i * 65,
                            y: 50 + j * 55,
                            encrypted: false,
                            id: i * 6 + j
                        });
                    }
                }

                const fileElements = svg.selectAll(".file")
                    .data(fileGrid)
                    .enter().append("g")
                    .attr("class", "file");

                fileElements.append("rect")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y)
                    .attr("width", 50)
                    .attr("height", 40)
                    .attr("fill", "#4ecdc4")
                    .attr("stroke", "#333")
                    .attr("rx", 3);

                fileElements.append("text")
                    .attr("x", d => d.x + 25)
                    .attr("y", d => d.y + 25)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#333")
                    .attr("font-size", "20")
                    .text("📄");

                const locks = fileElements.append("text")
                    .attr("x", d => d.x + 25)
                    .attr("y", d => d.y + 25)
                    .attr("text-anchor", "middle")
                    .attr("fill", "#ff4444")
                    .attr("font-size", "24")
                    .text("🔒")
                    .style("opacity", 0);

                let encryptionIndex = 0;
                const encryptionTimer = setInterval(() => {
                    if (encryptionIndex < fileGrid.length) {
                        fileGrid[encryptionIndex].encrypted = true;
                        
                        d3.select(fileElements.nodes()[encryptionIndex])
                            .select("rect")
                            .transition()
                            .duration(200)
                            .attr("fill", "#ff4444");

                        d3.select(locks.nodes()[encryptionIndex])
                            .transition()
                            .duration(200)
                            .style("opacity", 1);

                        encryptionIndex++;
                    } else {
                        clearInterval(encryptionTimer);
                    }
                }, 150);

                cleanup = () => clearInterval(encryptionTimer);
                break;

            default:
                break;
        }

        // Return cleanup function
        return cleanup;
    }, [attackType, isActive]);

    return (
        <div ref={containerRef} className={`cyber-viz ${isActive ? 'active' : ''}`}>
            <svg ref={svgRef}></svg>
        </div>
    );
};

// Glitch Text Component
const GlitchText = ({ children, isActive }) => {
    if (isActive === true)
    {
        return (
            <div className={`glitch-text ${isActive ? 'active' : ''}`}>
                <span className="glitch-text-content">{children}</span>
                <span className="glitch-text-content">{children}</span>
                <span className="glitch-text-content">{children}</span>
            </div>
        );
    }
    else
    {
        return (
            <div className="glitch-text">
                <span className="glitch-text-content">{children}</span>
            </div>
        );
    }
};

function Vis() {
    const [currentStepData, setCurrentStepData] = useState(null);
    const [currentComment, setCurrentComment] = useState(null);
    const [currentStepProgress, setCurrentStepProgress] = useState(null);
    const [currentStepProgress1, setCurrentStepProgress1] = useState(null);
    const [currentStepProgress2, setCurrentStepProgress2] = useState(null);
    const [currentStepProgress3, setCurrentStepProgress3] = useState(null);
    const [activeViz, setActiveViz] = useState(null);
    const [glitchActive, setGlitchActive] = useState(false);

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
        if (data && data.viz) {
            setActiveViz(data.viz);
        }
    };

    const stepUpdateComment = ({ data }) => {
        setCurrentComment(data);
        if (data === "LOGIN FAILED" || data === "It's all gone.") {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 2000);
        }
    };
    
    return (
        <div className="page-container" style={{background: "#FFFFFF"}}>
            <div className="background-dark" style={{width: "100vw"}}>
                <div className="body-text" style={{position: "sticky", top: "25vh"}}>
                    <GlitchText isActive={glitchActive}>
                        {currentComment === null ? "" : currentComment}
                    </GlitchText>
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

                <div className="background-screen" style={{width: "100vw"}}>
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

                <div className="background-error" style={{width: "100vw"}}>
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

                <div className="background-dark" style={{width: "100vw"}}>
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
                        <Step data={""}>
                            <div>
                                <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                                    <div className="accent-text large-text" style={{opacity: (currentStepProgress1 || 0)}}>
                                        <AnimatedCounter value={299} prefix="" suffix="" shouldAnimate={currentStepProgress1 > 0.5} />
                                    </div>
                                    <div className="medium-text" style={{opacity: (currentStepProgress1 || 0)}}>
                                        large-scale attacks during 2024.
                                    </div>
                                </div>
                                <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                            </div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.9} onStepProgress={stepUpdateProgress2}>
                        <Step data={""}>
                            <div>
                                <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                                    <div className="accent-text large-text" style={{opacity: (currentStepProgress2 || 0)}}>
                                        <AnimatedCounter value={15.4} prefix="" suffix=" Billion" shouldAnimate={currentStepProgress2 > 0.5} />
                                    </div>
                                    <div className="medium-text" style={{opacity: (currentStepProgress2 || 0)}}>
                                        USD lost from cyber attacks during 2024.
                                    </div>
                                </div>
                                <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                            </div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "25pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.9} onStepProgress={stepUpdateProgress3}>
                        <Step data={""}>
                            <div>
                                <div className="row-container body-text" style={{alignItems: "center", height: "64pt", gap: "8pt"}}>
                                    <div className="accent-text large-text" style={{opacity: (currentStepProgress3 || 0)}}>
                                        <AnimatedCounter value={153} prefix="" suffix=" Million" shouldAnimate={currentStepProgress3 > 0.5} />
                                    </div>
                                    <div className="medium-text" style={{opacity: (currentStepProgress3 || 0)}}>
                                        users impacted by cyber attacks during 2024.
                                    </div>
                                </div>
                                <div style={{height: "100pt", width: "100%"}}>&nbsp;</div>
                            </div>
                        </Step>
                    </Scrollama>

                    <div style={{height: "50pt", width: "100%"}}>&nbsp;</div>

                    <div className="medium-text">
                        Behind the Numbers: How Attacks Unfold
                    </div>

                    <div style={{height: "50pt", width: "100%"}}>&nbsp;</div>

                    <Scrollama offset={0.5} onStepEnter={stepUpdateData}>
                        <Step data={{viz: "ddos"}}>
                            <div style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <div className="medium-text" style={{marginBottom: "2rem"}}>
                                    DDoS Attack: Network Overload
                                </div>
                                <CyberAttackViz attackType="ddos" isActive={activeViz === "ddos"} />
                                <div className="body-text" style={{marginTop: "2rem"}}>
                                    Watch as infected nodes (red) overwhelm the network, spreading chaos through connected systems.
                                </div>
                            </div>
                        </Step>
                    </Scrollama>

                    <Scrollama offset={0.5} onStepEnter={stepUpdateData}>
                        <Step data={{viz: "phishing"}}>
                            <div style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <div className="medium-text" style={{marginBottom: "2rem"}}>
                                    Phishing Attack: Baiting Victims
                                </div>
                                <CyberAttackViz attackType="phishing" isActive={activeViz === "phishing"} />
                                <div className="body-text" style={{marginTop: "2rem"}}>
                                    Data packets (blue) fall into the trap. Once caught, they turn red - compromised forever.
                                </div>
                            </div>
                        </Step>
                    </Scrollama>

                    <Scrollama offset={0.5} onStepEnter={stepUpdateData}>
                        <Step data={{viz: "ransomware"}}>
                            <div style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <div className="medium-text" style={{marginBottom: "2rem"}}>
                                    Ransomware Attack: Files Under Siege
                                </div>
                                <CyberAttackViz attackType="ransomware" isActive={activeViz === "ransomware"} />
                                <div className="body-text" style={{marginTop: "2rem"}}>
                                    One by one, files get encrypted and locked. Years of work, locked behind digital bars.
                                </div>
                            </div>
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
                                <img src={Fig1} alt="Ransomware" />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                            <div className="body-text">
                                Ransomware
                            </div>
                        </div>

                        <div className="col-container">
                            <button type="button" onClick={() => window.location.replace("/")} className="row-container background-radial-select" style={{ height: "auto", width: "20vw"}}>
                                <img src={Fig2} alt="Phishing" />
                            </button>
                            <div className="body-text">
                                Phishing
                            </div>
                        </div>

                        <div className="col-container">
                            <button type="button" onClick={() => window.location.replace("/")} className="row-container background-radial-select" style={{ height: "auto", width: "20vw"}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={Fig3} alt="DDoS" />
                            </button>
                            <div className="body-text">
                                DDoS
                            </div>
                        </div>
                    </div>

                    <div style={{height: "25vh", width: "100%"}}>&nbsp;</div>
                </div>
            </div>
        </div>
    );
}

export default Vis;