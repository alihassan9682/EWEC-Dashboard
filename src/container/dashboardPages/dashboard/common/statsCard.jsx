/** @format */

import { Link } from "react-router-dom";
import { Totalcustomers } from "../crmdata";

const StatsCard = ({title, logo,  logoBg, count, addition, }) => {
  return (
    <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
      <div className="box overflow-hidden">
        <div className="box-body">
          <div className="flex items-top justify-between">
            {/* <div>
              <span
                className={`!text-[0.8rem]  !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !rounded-full inline-flex items-center justify-center ${
                  logoBg ? logoBg : "bg-primary"
                }`}
              >
                <span className="text-[1rem] text-white">
                  {logo}
                </span>
              </span>
            </div> */}
            <div className="flex-grow ms-4">
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <p className="text-[#8c9097] dark:text-white/50 text-[0.813rem] mb-0">
                    {title}
                  </p>
                  <h4 className="font-semibold  text-[1.5rem] !mb-2 ">
                    {count}
                  </h4>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
