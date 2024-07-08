/** @format */

import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authbackground from "../assets/images/authentication/bg.png";
import ims from "../assets/images/brand-logos/ims_logo.png";
import { login, logout } from "./api";
import toast from "react-hot-toast";

const Login = () => {
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    if (location.pathname === "/login/" || location.pathname === "/login") {
      logout();
    }
  }, [location]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
        toast.success("User Logged in successfully!");
      } else {
        toast.error("Please enter valid credentials");
        setError(result?.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Please enter valid credentials");
      setError("An error occurred. Please try again.");
    }
  };

 

  return (
    <Fragment>
      <div
        className="bg-cover"
        style={{ backgroundImage: `url(${authbackground})` }}
      >
        <div className="flex justify-center authentication authentication-basic items-center h-full text-defaultsize ">
          <div className="grid grid-cols-12">
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="bg-transparent border border-white !p-[2rem] rounded-xl transform scale-x-110">
                <div className="tranform scale-75 flex justify-center">
                  <img src={ims} alt="logo" className="" />
                </div>
                <div
                  className="box-body"
                  role="tabpanel"
                  id=""
                  aria-labelledby=""
                >
                  <p className="text-4xl font-medium mb-2 text-center !text-white">
                    Sign In
                  </p>
                  {err && (
                    <div
                      className="alert-danger px-4 py-3 shadow-md bg mb-2"
                      role="alert"
                    >
                      <div className="flex">
                        <div className="py-1"></div>
                        <div>{err}</div>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-12 gap-y-4">
                    <div className="xl:col-span-12 col-span-12">
                      <input
                        type="username"
                        name="username"
                        className="form-control form-control-lg w-full !rounded-md"
                        onChange={changeHandler}
                        value={username}
                        id="signin-username"
                        placeholder="user name"
                      />
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                      <label
                        htmlFor="signin-password"
                        className=" !text-white block"
                      >
                        <Link
                          to={`${
                            import.meta.env.BASE_URL
                          }authentication/resetpassword/resetbasic`}
                          className="float-end text-danger"
                        >
                          Forget password ?
                        </Link>
                      </label>
                      <div className="input-group">
                        <input
                          type={passwordshow1 ? "text" : "password"}
                          className="form-control form-control-lg !rounded-s-md"
                          name="password"
                          placeholder="password"
                          value={password}
                          onChange={changeHandler}
                        />
                        <button
                          onClick={() => setpasswordshow1(!passwordshow1)}
                          aria-label="button"
                          className="ti-btn ti-btn-light !rounded-s-none !mb-0"
                          type="button"
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              passwordshow1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="form-check !ps-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label text-[#8c9097] dark:text-white/50 font-normal"
                            htmlFor="defaultCheck1"
                          >
                            Remember password ?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                      <button
                        className="ti-btn ti-btn-primary !bg-sky-600 !text-white !font-medium"
                        onClick={handleLogin}
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                  <div className="text-center !mt-4">
                    <span className="text-white">
                      &copy; Copyright Inspection Management System <br />
                      All Rights Reserved
                    </span>
                    <div className="text-white mt-2 hover:cursor-pointer">
                      Privacy Policy | Terms of Service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
