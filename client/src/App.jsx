import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx"
import Vis from "./Vis.jsx"

function App()
{
    return (
        <div className="App" id="App">
        <Routes>
            <Route path="/" element={<Vis />} />
            <Route path="/data-vis" element={<Vis />} />
            <Route path="/ransomware" element={<Home />} />
            <Route path="/phishing" element={<Home />} />
        </Routes>
        </div>
    );
}

export default App;