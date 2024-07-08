/** @format */

import { Link } from "react-router-dom";
import  Dashed  from "./lineData";

const EntityRecordCount = ({ start_date, end_date }) => {
  return (
    <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
      <div className="box">
        <div className="box custom-box">
          <div className="box-header">
            <div className="box-title">Results</div>
          </div>
          <div className="box-body">
            <div id="dashed-chart">
              <Dashed start_date={start_date} end_date={end_date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityRecordCount;
