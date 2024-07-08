/** @format */

import { Fragment, useState, useEffect } from "react";
import Greetings from "../common/greetingscard";
import EvincesOnBU from "./evincesOnBU";
import EntityRecordCount from "./entityRecordCounts";
import EvincesDistibution from "./evincesDistribution";
import EquipmentCalibrationStatus from "./equipmentStatus";
import StatsCard from "../common/statsCard";
import WorldMap from "./maps";
import Basictreemap from "./heatmap";
import { Semicirclegauge } from "./halfDonut";
import Basicpiechart from "./piCharts";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";
import axios from "axios";

const Dashboard = () => {
  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const startDate = new Date(today.setDate(today.getDate() - 10))
    .toISOString()
    .split("T")[0];

  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
  });
  const [regionOptions, setRegionOptions] = useState([]);
  const [adminData, setAdminData] = useState(null); // State to store admin data

  useEffect(() => {
    fetchRegionOptions();
    fetchAdminData(); // Fetch admin data when component mounts
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [value]);

  const fetchRegionOptions = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/list-of-regions/?start_date=${value.startDate}&end_date=${value.endDate}`
      );

      const uniqueRegions = new Set(response.data.regions);
      const regions = Array.from(uniqueRegions).map((region) => ({
        value: region,
        label: region,
      }));
      setRegionOptions(regions);
    } catch (error) {
      console.error("Error fetching region options", error);
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/test-stats/?start_date=${value.startDate}&end_date=${value.endDate}`
      );
      const data = response.data;
      data.failed_percentage = parseFloat(data.failed_percentage.toFixed(2));
      data.passed_percentage = parseFloat(data.passed_percentage.toFixed(2));
      setAdminData(data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  const handleValueChange = (newValue) => {
    if (newValue.startDate && newValue.endDate) {
      setValue(newValue);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-row gap-2">
        <div className="mb-4 bg-slate-100 w-1/3 box custom-box">
          <div className="box-header">
            <div className="box-title">Select Date range and Region</div>
          </div>
          <div className="grid grid-cols-1 gap-4 px-4 py-2">
            <div className="flex flex-col">
              <label className="text-slate-900">Select Date Range:</label>
              <Datepicker
                primaryColor={"sky"}
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
                maxDate={endDate}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900">Select Region:</label>
              <Select
                options={regionOptions}
                isSearchable={true}
                placeholder="Select region..."
                // No onChange handler to meet your requirement
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <Greetings />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <div className="xxl:col-span-9 xl:col-span-12 col-span-12">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xxl:col-span-4 xl:col-span-4 col-span-12">
              <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                <div className="box custom-box">
                  <div className="box-header">
                    <div className="box-title">
                      Sample Percentage compliance
                    </div>
                  </div>
                  <div className="box-body">
                    <div id="circular-semi">
                      <Semicirclegauge
                        start_date={value.startDate}
                        end_date={value.endDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="box custom-box">
                <div className="box-header">
                  <div className="box-title">Workorder by Zones</div>
                </div>
                <div className="box-body">
                  <div id="pie-basic">
                    <Basicpiechart
                      start_date={value.startDate}
                      end_date={value.endDate}
                    />
                  </div>
                </div>
              </div>
              <div className="box custom-box">
                <div className="box-header">
                  <div className="box-title">Results</div>
                </div>
                <div id="heatmap-basic">
                  <Basictreemap
                    start_date={value.startDate}
                    end_date={value.endDate}
                  />
                </div>
              </div>
            </div>
            <div className="xxl:col-span-8 xl:col-span-8 col-span-12">
              <div className="grid grid-cols-12 gap-x-6 ">
                {adminData && (
                  <Fragment>
                    <StatsCard
                      title="Total Tests"
                      count={adminData.total_tests}
                      icon="AiOutlineFileText"
                      iconBg="#2C5282"
                    />
                    <StatsCard
                      title="Failed Tests"
                      count={adminData.failed_tests}
                      icon="AiOutlineClose"
                      iconBg="#C53030"
                    />
                    <StatsCard
                      title="Passed Tests"
                      count={adminData.passed_tests}
                      icon="AiOutlineCheck"
                      iconBg="#38A169"
                    />
                    <StatsCard
                      title="Failed Percentage"
                      count={`${adminData.failed_percentage}%`}
                      icon="AiOutlineWarning"
                      iconBg="#DD6B20"
                    />
                    <StatsCard
                      title="Passed Percentage"
                      count={`${adminData.passed_percentage}%`}
                      icon="AiOutlineCheckCircle"
                      iconBg="#319795"
                    />
                  </Fragment>
                )}
              </div>

              <EntityRecordCount
                start_date={value.startDate}
                end_date={value.endDate}
              />

              <EvincesOnBU
                start_date={value.startDate}
                end_date={value.endDate}
              />
            </div>
          </div>
        </div>
        <div className="xxl:col-span-3 xl:col-span-12 col-span-12">
          <div className="">
            <EvincesDistibution
              start_date={value.startDate}
              end_date={value.endDate}
            />
            <div className="box custom-box">
              <div className="box-header">
                <div className="box-title">Samples by location</div>
              </div>
              <div className="box-body">
                <div id="circular-semi">
                  <WorldMap
                    start_date={value.startDate}
                    end_date={value.endDate}
                  />
                </div>
              </div>
            </div>
            {/* <EquipmentCalibrationStatus
              start_date={value.startDate}
              end_date={value.endDate}
            /> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
