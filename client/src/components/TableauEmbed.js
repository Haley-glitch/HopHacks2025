// import React, { useRef, useEffect } from "react";

// function TableauEmbed() {
//     const ref = useRef(null);
    
//     const url = "https://public.tableau.com/views/RegionalSampleWorkbook/Obesity";
    
//     const options = {
//         device: "desktop"
//     };

//     useEffect(() => {
//         // Simple script loading
//         const script = document.createElement("script");
//         script.src = "https://public.tableau.com/javascripts/api/tableau-2.min.js";
//         script.onload = () => {
//             // Initialize viz when script loads
//             new window.tableau.Viz(ref.current, url, options);
//         };
//         document.body.appendChild(script);

//         // Cleanup
//         return () => {
//             if (document.body.contains(script)) {
//                 document.body.removeChild(script);
//             }
//         };
//     }, []);

//     return (
//         <div>
//             <p style={{ color: "rgb(0,0,0)" }}>This is my Tableau dashboard</p>
//             <div ref={ref} style={{ width: "100%", height: "600px" }}></div>
//         </div>
//     );
// }

// export default TableauEmbed;
import React, { useRef, useEffect } from "react";

function TableauEmbed({ url }) { // Accept url as a prop
    const ref = useRef(null);
    
    const options = {
        device: "desktop"
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://public.tableau.com/javascripts/api/tableau-2.min.js";
        script.onload = () => {
            if (ref.current && window.tableau) {
                new window.tableau.Viz(ref.current, url, options);
            }
        };
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [url]); // re-run if url changes

    return (
        <div>
            <p style={{ color: "rgb(0,0,0)" }}>This is my Tableau dashboard</p>
            <div ref={ref} style={{ width: "100%", height: "600px" }}></div>
        </div>
    );
}

export default TableauEmbed;
