import React, { useState, useEffect } from "react";
import "./Heatmap.css";

const Heatmap = () => {
  const [data, setData] = useState([]);
  const [hoveredMonth, setHoveredMonth] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  return (
    <div>
      <h1>Monthly Transaction Calendar</h1>
      <div className="heatmap">
        {data.map((monthData, index) => (
          <div
            key={index}
            className="month-box"
            onMouseEnter={() => setHoveredMonth(index)}
            onMouseLeave={() => setHoveredMonth(null)}
          >
            <h2>{monthData.month} 2024</h2>
            {hoveredMonth === index && (
              <div className="month-details">
                <p>
                  <strong>Total Amount:</strong> ${monthData.total}
                </p>
                <ul>
                  {monthData.categories.map((category, idx) => (
                    <li key={idx}>
                      <strong>{category.name}:</strong> ${category.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
