/** @format */

import { Link } from "react-router-dom";
import face10 from "../../../../assets/images/faces/1.jpg";

const TopManagers = () => {
  return (
    <div className="box">
      <div className="box-header flex justify-between">
        <div className="box-title">Top Managers</div>
        <div className="hs-dropdown ti-dropdown">
          <Link
            aria-label="anchor"
            to="#"
            className="flex items-center justify-center w-[1.75rem] h-[1.75rem]  !text-[0.8rem] !py-1 !px-2 rounded-sm bg-light border-light shadow-none !font-medium"
            aria-expanded="false"
          >
            <i className="fe fe-more-vertical text-[0.8rem]"></i>
          </Link>
          <ul className="hs-dropdown-menu ti-dropdown-menu hidden">
            <li>
              <Link
                className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                to="#"
              >
                Week
              </Link>
            </li>
            <li>
              <Link
                className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                to="#"
              >
                Month
              </Link>
            </li>
            <li>
              <Link
                className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                to="#"
              >
                Year
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="box-body">
        <ul className="list-none crm-top-deals mb-0">
          <li className="mb-[0.9rem]">
            <div className="flex items-start flex-wrap">
              <div className="me-2">
                <span className=" inline-flex items-center justify-center">
                  <img
                    src={face10}
                    alt=""
                    className="w-[1.75rem] h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full"
                  />
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                  Michael Jordan
                </p>
                <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                  michael.jordan@example.com
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Evince Count</span>
                <div className="font-semibold text-[0.9375rem] ">2,893</div>
              </div>
            </div>
          </li>
          <li className="mb-[0.9rem]">
            <div className="flex items-start flex-wrap">
              <div className="me-2">
                <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-warning  bg-warning/10 font-semibold">
                  EK
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                  Emigo Kiaren
                </p>
                <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                  emigo.kiaren@gmail.com
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Evince Count</span>
                <div className="font-semibold text-[0.9375rem] ">4,289</div>
              </div>
            </div>
          </li>
          <li className="mb-[0.9rem]">
            <div className="flex items-top flex-wrap">
              <div className="me-2">
                <span className="inline-flex items-center justify-center">
                  <img
                    src={face10}
                    alt=""
                    className="!w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full"
                  />
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                  Randy Origoan
                </p>
                <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                  randy.origoan@gmail.com
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Evince Count</span>
                <div className="font-semibold text-[0.9375rem] ">6,347</div>
              </div>
            </div>
          </li>
          <li className="mb-[0.9rem]">
            <div className="flex items-top flex-wrap">
              <div className="me-2">
                <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-success bg-success/10 font-semibold">
                  GP
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                  George Pieterson
                </p>
                <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                  george.pieterson@gmail.com
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Evince Count</span>
                <div className="font-semibold text-[0.9375rem] ">3,894</div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-top flex-wrap">
              <div className="me-2">
                <span className="inline-flex items-center justify-center !w-[1.75rem] !h-[1.75rem] leading-[1.75rem] text-[0.65rem]  rounded-full text-primary bg-primary/10 font-semibold">
                  KA
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold mb-[1.4px]  text-[0.813rem]">
                  Kiara Advain
                </p>
                <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                  kiaraadvain214@gmail.com
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Evince Count</span>
                <div className="font-semibold text-[0.9375rem] ">2,679</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopManagers;
