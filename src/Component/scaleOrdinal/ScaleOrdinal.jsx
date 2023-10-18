import React, { useEffect } from "react";
import * as d3 from "d3";
let data = [
  "jan",
  "feb",
  "mar",
  "april",
  "may",
  "June",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];
let ordinalScale = d3
  .scaleOrdinal()
  .domain(data)
  .range(["black", "red", "orange"]);
let width = 500;
let height = 500;
let xScale = d3.scaleLinear().domain([0, data.length]).range([0, width]);
function ScaleOrdinal() {
  useEffect(() => {
    d3.select("#wrapper")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d, i) => xScale(i))
      .attr("y", height / 2)
      .text((d) => d)
      .style("fill", (d) => ordinalScale(d));
  }, []);
  return (
    <div>
      <svg width={width} height={height}>
        <g id="wrapper" transform={`translate(100,0)`}></g>
      </svg>
    </div>
  );
}

export default ScaleOrdinal;
