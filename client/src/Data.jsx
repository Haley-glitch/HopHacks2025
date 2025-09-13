// Data.jsx
import React, { useEffect, useRef } from "react";

function TableauEmbed({ url }) {
  const ref = useRef(null);

  useEffect(() => {
    const initViz = () => {
      if (window.tableau && ref.current) {
        new window.tableau.Viz(ref.current, url, {
          width: "100%",
          height: "600px",
          hideTabs: true,
          hideToolbar: false,
        });
      }
    };

    // Load Tableau script if not already loaded
    if (!window.tableau) {
      const script = document.createElement("script");
      script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
      script.onload = initViz;
      document.body.appendChild(script);
    } else {
      initViz();
    }
  }, [url]);

  return <div ref={ref} />;
}

export default TableauEmbed;
