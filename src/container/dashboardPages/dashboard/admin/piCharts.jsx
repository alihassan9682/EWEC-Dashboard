/** @format */

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Basicpiechart = ({ start_date, end_date }) => {
  const [data, setData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/sample-by-zone/?start_date=${start_date}&end_date=${end_date}`
        );
        const result = await response.json();
        const series = result.map((item) => item.sample_count);
        const labels = result.map((item) => item.c_zone);
        setData({ series, labels });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [start_date, end_date]);

  const generateColors = (numColors, colorStart, colorEnd) => {
    const interpolateColor = (colorStart, colorEnd, factor) => {
      const result = colorStart.slice();
      for (let i = 0; i < 3; i++) {
        result[i] = Math.round(
          result[i] + factor * (colorEnd[i] - colorStart[i])
        );
      }
      return `rgb(${result.join(", ")})`;
    };

    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const factor = i / (numColors - 1);
      const newColor = interpolateColor(colorStart, colorEnd, factor);
      colors.push(newColor);
    }
    return colors;
  };

  const colors = generateColors(
    data.series.length,
    [255, 152, 0],
    [158, 158, 158]
  );

  const options = {
    chart: {
      height: 300,
      type: "pie",
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    colors: colors,
    labels: data.labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
  };

  const noDataOptions = {
    chart: {
      height: 300,
      type: "pie",
    },
    colors: ["#d3d3d3"],
    labels: ["No data available"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      textAnchor: "middle",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
      dropShadow: {
        enabled: false,
      },
    },
  };

  return (
    <div>
      {data.series.length > 0 ? (
        <ReactApexChart
          options={options}
          series={data.series}
          type="pie"
          height={300}
        />
      ) : (
        <ReactApexChart
          options={noDataOptions}
          series={[100]}
          type="pie"
          height={300}
        />
      )}
    </div>
  );
};

export default Basicpiechart;
