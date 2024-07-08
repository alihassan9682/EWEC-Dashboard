/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const EvincesDistribution = ({ start_date, end_date }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [sourceData, setSourceData] = useState({
    series: [],
    options: {
      labels: [],
      chart: {
        events: {
          mounted: (chart) => {
            chart.windowResizeHandler();
          },
        },
        height: 260,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "round",
        colors: ["#fff"],
        width: 0,
        dashArray: 0,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "82%",
            labels: {
              show: false,
              name: {
                show: true,
                fontSize: "20px",
                color: "#495057",
                offsetY: -4,
              },
              value: {
                show: true,
                fontSize: "18px",
                color: undefined,
                offsetY: 8,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
      },
      colors: ["#FF9800", "#FFD700", "#32CD32", "#ADFF2F", "#7FFF00"],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/sample-by-region/?start_date=${start_date}&end_date=${end_date}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const totalSamples = data.reduce(
          (sum, item) => sum + item.sample_count,
          0
        );
        setTotal(totalSamples);

        // Update sourceData based on fetched data
        const labels = data.map((item) =>
          item.region === "NULL" ? "UNSPECIFIED_REGION" : item.region
        );
        const series = data.map((item) => item.sample_count);

        setSourceData((prevSourceData) => ({
          ...prevSourceData,
          series: series,
          options: {
            ...prevSourceData.options,
            labels: labels,
          },
        }));
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, [start_date, end_date]);

  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box overflow-hidden">
        <div className="box-header justify-between flex flex-wrap items-center">
          <div className="box-title">Workorder by region</div>
          <div className="hs-dropdown ti-dropdown ml-auto">
            <Link
              aria-label="anchor"
              to="#"
              className="flex items-center justify-center w-[1.75rem] h-[1.75rem] text-[0.8rem] py-1 px-2 rounded-sm bg-light border-light shadow-none font-medium"
              aria-expanded="false"
            >
              <i className="fe fe-more-vertical"></i>
            </Link>
            <ul className="hs-dropdown-menu ti-dropdown-menu hidden absolute right-0 mt-2">
              <li>
                <Link
                  className="ti-dropdown-item py-2 px-[0.9375rem] text-[0.8125rem] font-medium block"
                  to="#"
                >
                  Week
                </Link>
              </li>
              <li>
                <Link
                  className="ti-dropdown-item py-2 px-[0.9375rem] text-[0.8125rem] font-medium block"
                  to="#"
                >
                  Month
                </Link>
              </li>
              <li>
                <Link
                  className="ti-dropdown-item py-2 px-[0.9375rem] text-[0.8125rem] font-medium block"
                  to="#"
                >
                  Year
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="box-body">
          <div className="leads-source-chart flex items-center justify-center">
            <div>
              <ReactApexChart
                options={sourceData.options}
                series={sourceData.series}
                type="donut"
                height={260}
              />
            </div>
            <div className="lead-source-value text-center mt-4">
              <span className="block text-[0.875rem]">Total Samples</span>
              <span className="block text-[1.5625rem] font-bold">{total}</span>
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : data.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className="flex flex-col justify-start items-start ">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg text-center flex flex-row"
                  >
                    <span className=" text-xs font-semibold block capitalize">
                      {item.region === "NULL"
                        ? "UNSPECIFIED_REGION"
                        : item.region}{" "}
                      :
                    </span>
                    <span className="text-xs  text-gray-600 block">
                      {item.sample_count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvincesDistribution;
