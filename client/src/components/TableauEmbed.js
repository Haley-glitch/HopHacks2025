import React, { useRef, useEffect } from "react";

function TableauEmbed({ url, width = "100%", height = "600px" }) {
    const ref = useRef(null);
    
    // Use the passed URL or fallback to default
    const vizUrl = url || "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
    
    const options = {
        device: "desktop",
        width: width,
        height: height
    };

    useEffect(() => {
        // Simple script loading
        const script = document.createElement("script");
        script.src = "https://public.tableau.com/javascripts/api/tableau-2.min.js";
        script.onload = () => {
            // Initialize viz when script loads
            new window.tableau.Viz(ref.current, vizUrl, options);
        };
        document.body.appendChild(script);

        // Cleanup
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [vizUrl]);

    return (
        <div style={{ width: "100%", padding: "20px 0" }}>
            <div 
                ref={ref} 
                style={{ 
                    width: width, 
                    height: height,
                    margin: "0 auto",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    backgroundColor: "#1a1a1a"
                }}
            />
        </div>
    );
}

export default TableauEmbed;