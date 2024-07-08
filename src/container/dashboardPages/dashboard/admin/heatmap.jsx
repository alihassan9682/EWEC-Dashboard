/** @format */

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Basictreemap = ({ start_date, end_date }) => {
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [parameterOptions, setParameterOptions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch parameter options from the first endpoint
    fetch(
      `http://127.0.0.1:8000/list-of-analysis/?start_date=${start_date}&end_date=${end_date}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure parameter options are unique
        const uniqueOptions = [...new Set(data.analysis)];
        setParameterOptions(uniqueOptions);
        setSelectedParameter(uniqueOptions[0]); // Set default selection
      })
      .catch((error) => {
        console.error("Error fetching parameter options:", error);
      });
  }, [start_date, end_date]);

  useEffect(() => {
    // Fetch chart data based on selected parameter from the second endpoint
    if (selectedParameter) {
      fetch(
        `http://127.0.0.1:8000/results-by-analysis/?analysis=${selectedParameter}&start_date=${start_date}&end_date=${end_date}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Check if data.series is empty
          if (data.series && data.series.length > 0) {
            setChartData(data.series);
          } else {
            setChartData([]); // Set empty array if no data
          }
          console.log("Chart data:", data.series); // Log chart data for debugging
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
          setChartData([]); // Set empty array on error
        });
    }
  }, [selectedParameter, start_date, end_date]);

  const options = {
    legend: {
      show: true,
    },
    chart: {
      height: 350,
      type: "treemap",
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    colors: ["#FF9800", "#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100"],
    title: {
      text: "Analysis Results",
      align: "left",
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        color: "#8c9097",
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (val, opts) {
        const item = opts.dataPoint.data;
        const { entry, min_limit, max_limit, in_spec, sample_number } = item;

        // Format the tooltip content
        return `
          <div style="text-align: left; padding: 5px;">
            <div><strong>Entry:</strong> ${entry}</div>
            <div><strong>Min Limit:</strong> ${min_limit}</div>
            <div><strong>Max Limit:</strong> ${max_limit}</div>
            <div><strong>In Spec:</strong> ${in_spec}</div>
            <div><strong>Sample Number:</strong> ${sample_number}</div>
          </div>
        `;
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col">
        <label>Parameters</label>
        <select
          value={selectedParameter}
          onChange={(e) => setSelectedParameter(e.target.value)}
        >
          {parameterOptions.map((parameter, index) => (
            <option key={index} value={parameter}>
              {parameter}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: "350px", overflow: "hidden" }}>
        {chartData.map((series, index) => (
          <div key={index}>
            <ReactApexChart
              options={options}
              series={[
                {
                  name: series.name,
                  data: series.data.map((item) => ({
                    x: item.entry,
                    y: item.sample_number,
                    data: item, // Attach all data to be accessible in the formatter
                  })),
                },
              ]}
              type="treemap"
              height={350}
            />
            <div
              style={{ margin: "10px 0", fontSize: "14px", fontWeight: "bold" }}
            >
              {series.name} Details
            </div>
          </div>
        ))}
        {chartData.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No data available for selected parameter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Basictreemap;
