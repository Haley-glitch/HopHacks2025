import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./Vis.css";
import TableauEmbed from "./components/TableauEmbed";

function Vis() {
    const [currentStepData, setCurrentStepData] = useState(null);

    const stepUpdate = ({ data }) => {
        setCurrentStepData(data);
    };

    return (
        <div className="page-container background-light">
            <h2>Cyberattack Visualizations</h2>
            <TableauEmbed url="https://public.tableau.com/views/RegionalSampleWorkbook/Obesity" />
        </div>
    );
}

export default Vis;
