import React, { useEffect } from "react";
import * as d3 from "d3";
import { useState } from "react";
//Dummy Data
let initialData = [
  { name: "pizza", count: 200 },
  { name: "sandwich", count: 800 },
  { name: "Pasta", count: 650 },
  { name: "Burger", count: 390 },
  { name: "Fries", count: 360 },
  { name: "Cake", count: 280 },
  { name: "Momos", count: 200 },
  { name: "Panipuri", count: 340 },
];
const  width = 600; // Width of SVG
const  height = 400; // Height of SVG
const  padding = 20; //Padding

//Component
function BarChart() {
  const [data, setData] = useState(initialData); //Data handled with State

  // Generating Random Data
  const generateData = () => {
    const updatedData = data.map((d) => ({
      ...d,
      count: Math.floor(Math.random() * 990) + 10,
    }));
    setData(updatedData);
  };

  //XScale- Used for Plotting Element Horizontally
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([padding, width - padding])
    .padding(0.1); // Added padding for better spacing

  // YScale- Used for Plotting Element Vertically
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((i) => i.count))])
    .range([height - padding, padding]); // Adjusted the range

  //X & Y Axis of the Graph
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    const svg = d3.select("#wrapper");

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.count) - padding) // Adjusted the height
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.count))
      .attr("fill", "steelblue"); // Added fill color


    //For X axis
    d3.select("svg")
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", `translate(${padding}, ${height - padding})`)
      .call(xAxis);

    // For Y axis
    d3.select("svg")
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(${2*padding}, 0)`)
      .call(yAxis);

    return () => {
      d3.select("#wrapper").selectAll("rect").remove();
      d3.select(".xaxis").remove();
      d3.select(".yaxis").remove();
    };
  }, [xScale, yScale]);
  return (
    <div>
      <svg width={width} height={height}>
        <g id="wrapper" transform={`translate(${padding},0)`}></g>
      </svg>
      <button onClick={generateData}>Update Data</button>
    </div>
  );
}

export default BarChart;
