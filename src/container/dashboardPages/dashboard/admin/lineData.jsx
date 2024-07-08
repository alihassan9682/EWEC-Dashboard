/** @format */

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import axios from "axios";

const Dashed = ({ start_date, end_date }) => {
  const [data, setData] = useState([]);
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);
  const [analysisOptions, setAnalysisOptions] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 320,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "straight",
    },
    colors: ["#845adf", "#23b7e5", "#f5b849"],
    title: {
      text: "",
      align: "left",
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        color: "#8c9097",
      },
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [],
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      title: {
        text: "Sample Number",
        style: {
          color: "#8c9097",
          fontSize: "13px",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#8c9097",
          fontSize: "11px",
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      title: {
        text: "Entry",
        style: {
          color: "#8c9097",
          fontSize: "13px",
          fontWeight: "bold",
        },
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return "Sample Number: " + val;
        },
      },
      y: {
        title: {
          formatter: function (val) {
            return "Entry: ";
          },
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  });

  useEffect(() => {
    fetchAnalysisOptions();
  }, [start_date, end_date]);

  const fetchAnalysisOptions = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/list-of-analysis/?start_date=${start_date}&end_date=${end_date}`
      );
      const uniqueValues = Array.from(new Set(response.data.analysis));
      const filteredValues = uniqueValues.filter((value) => value.length <= 5);
      const options = filteredValues.map((value) => ({
        value,
        label: value,
      }));

      setAnalysisOptions(options);

      // Determine preselected values based on the fetched data
      const preselectedValues = options
        .slice(0, 2)
        .map((option) => option.value); // Example: Selecting the first two values
      setSelectedAnalyses(preselectedValues);

      // Fetch chart data after setting state
      fetchChartData(preselectedValues);
    } catch (error) {
      console.error("Error fetching analysis options", error);
    }
  };

  const handleAnalysisChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedAnalyses(selectedValues);
    fetchChartData(selectedValues);
  };

  const fetchChartData = async (selectedValues) => {
    if (selectedValues.length === 0) return;

    const analysisParam = selectedValues.join(",");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/data-for-line-chart/?analysis=${analysisParam}&start_date=${start_date}&end_date=${end_date}`
      );
      const seriesData = response.data.series;
      const categories =
        seriesData[0]?.data.map((item) => item.sample_number) || [];

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories,
        },
      }));

      setData(seriesData);
    } catch (error) {
      console.error("Error fetching chart data", error);
    }
  };

  const series = data.map((analysis) => ({
    name: analysis.name,
    data: analysis.data.map((item) => item.entry),
  }));

  return (
    <div>
      <div>
        <label>Parameters</label>
        <Select
          isMulti
          value={analysisOptions.filter((option) =>
            selectedAnalyses.includes(option.value)
          )}
          options={analysisOptions}
          onChange={handleAnalysisChange}
        />
      </div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="line"
          height={400}
        />
      </div>
    </div>
  );
};

export default Dashed;
