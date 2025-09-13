import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.jsx"

function App()
{
    return (
        <div className="App" id="App">
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </div>
    );
}

export default App;