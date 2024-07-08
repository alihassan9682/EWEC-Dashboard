/** @format */

import { Link } from "react-router-dom";
import { Profitearned } from "../crmdata";

const EquipmentCalibrationStatus = () => {
  return (
    <div className="xxl:col-span-12 xl:col-span-6  col-span-12">
      <div className="box">
        <div className="box-header justify-between">
          <div className="box-title">Deals Status</div>
          <div className="hs-dropdown ti-dropdown">
            <Link
              to="#"
              className="text-[0.75rem] px-2 font-normal text-[#8c9097] dark:text-white/50"
              aria-expanded="false"
            >
              View All
              <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
            </Link>
            <ul
              className="hs-dropdown-menu ti-dropdown-menu hidden"
              role="menu"
            >
              <li>
                <Link
                  className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                  to="#"
                >
                  Today
                </Link>
              </li>
              <li>
                <Link
                  className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                  to="#"
                >
                  This Week
                </Link>
              </li>
              <li>
                <Link
                  className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                  to="#"
                >
                  Last Week
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="box-body">
          <div className="flex items-center mb-[0.8rem]">
            <h4 className="font-bold mb-0 text-[1.5rem] ">4,289</h4>
            <div className="ms-2">
              <span className="py-[0.18rem] px-[0.45rem] rounded-sm text-success !font-medium !text-[0.75em] bg-success/10">
                1.02
                <i className="ri-arrow-up-s-fill align-mmiddle ms-1"></i>
              </span>
              <span className="text-[#8c9097] dark:text-white/50 text-[0.813rem] ms-1">
                compared to last week
              </span>
            </div>
          </div>

          <div className="flex w-full h-[0.3125rem] mb-6 rounded-full overflow-hidden">
            <div
              className="flex flex-col justify-center rounded-s-[0.625rem] overflow-hidden bg-primary w-[21%]"
              style={{ width: "21%" }}
              aria-valuenow={21}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
            <div
              className="flex flex-col justify-center rounded-none overflow-hidden bg-info w-[26%]"
              style={{ width: "26%" }}
              aria-valuenow={26}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
            <div
              className="flex flex-col justify-center rounded-none overflow-hidden bg-warning w-[35%]"
              style={{ width: "35%" }}
              aria-valuenow={35}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
            <div
              className="flex flex-col justify-center rounded-e-[0.625rem] overflow-hidden bg-success w-[18%]"
              style={{ width: "18%" }}
              aria-valuenow={18}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <ul className="list-none mb-0 pt-2 crm-deals-status">
            <li className="primary">
              <div className="flex items-center text-[0.813rem]  justify-between">
                <div>Successful Deals</div>
                <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
                  987 deals
                </div>
              </div>
            </li>
            <li className="info">
              <div className="flex items-center text-[0.813rem]  justify-between">
                <div>Pending Deals</div>
                <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
                  1,073 deals
                </div>
              </div>
            </li>
            <li className="warning">
              <div className="flex items-center text-[0.813rem]  justify-between">
                <div>Rejected Deals</div>
                <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
                  1,674 deals
                </div>
              </div>
            </li>
            <li className="success">
              <div className="flex items-center text-[0.813rem]  justify-between">
                <div>Upcoming Deals</div>
                <div className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
                  921 deals
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCalibrationStatus;
