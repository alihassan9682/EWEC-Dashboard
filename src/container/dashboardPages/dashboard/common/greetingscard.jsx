/** @format */
import { getCurrentGreeting } from "../helpers";
import { useSelector } from "react-redux";

const Greetings = () => {
  const user = useSelector((state) => state.userInfo);
  return (
    <div className="box crm-highlight-card !h-full">
      <div className="box-body ">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-[1.125rem] text-white mb-2  outline-4 outline-offset-1 !opacity-100">
              EWEC
            </div>
            <div className="block text-3xl text-white">
              <span className="">{getCurrentGreeting()}</span>{" "}
            </div>
            <div className="block  text-white">
              Welcome back,{" "}
              Your leadership shapes our journey to success. Dive into the
              latest stats and insights!
            </div>
          </div>
          <div>
            <div id="crm-main">{/* <Profit /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
