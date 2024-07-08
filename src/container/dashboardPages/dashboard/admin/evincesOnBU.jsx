/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const EvincesOnBU = ({ start_date, end_date }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/sample-by-sampling-point/?start_date=${start_date}&end_date=${end_date}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [start_date, end_date]);

  // Prepare series and options for the bar chart
  const series = [
    {
      name: "Sample Count",
      data: data.map((item) => item.sample_count),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 250, // Adjusted height here
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    colors: ["#FF9800"],
    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: undefined,
    },
    legend: {
      show: false,
      position: "top",
    },
    yaxis: {
      title: {
        text: "Sample count",
        style: {
          color: "#FF9800",
          fontSize: "11px",
          fontFamily: "poppins, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-yaxis-label",
        },
      },
      labels: {
        formatter: function (y) {
          return y.toFixed(0) + "";
        },
        style: {
          colors: "#FF9800",
          fontSize: "11px",
          fontFamily: "poppins, sans-serif",
        },
      },
    },
    xaxis: {
      type: "category",
      categories: data.map((item) => item.sampling_point),
      axisBorder: {
        show: true,
        color: "#FF9800",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#FF9800",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
      title: {
        text: "Sampling Points",
        style: {
          color: "#FF9800",
          fontSize: "11px",
          fontFamily: "poppins, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };

  return (
    <div className="box">
      <div className="box-header justify-between">
        <div className="box-title">Workorder by location</div>
      </div>
      <div className="box-body !py-0 !ps-0">
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No data available for the selected period.</p>
        ) : (
          <div id="crm-profits-earned">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={450}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EvincesOnBU;
