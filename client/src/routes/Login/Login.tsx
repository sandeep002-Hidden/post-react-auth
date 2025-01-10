/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import LoadingSpinner from "@/components/Loading/Loading";
export default function Login() {
  const [user, setUser] = useState({
    UserNameOrEmail: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [message, setMessage] = useState({
    Message: "",
    isGood: false,
  });
  useEffect(() => {
    if (loading) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [loading]);
  useEffect(() => {
    if (
      user.UserNameOrEmail.trim().length > 0 &&
      user.Password.trim().length > 0
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [user]);
  const handelClick = async () => {
    if (loading) return;
    try {
      setLoading(true);
      // console.log("backend uri", import.meta.env.VITE_BACKEND_URI)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/auth/login`,
        { cred: user.UserNameOrEmail, password: user.Password }
      );
      console.log(response);
    } catch (error:any) {
      setMessage({ ...message, Message: error.message, isGood: false });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-950 h-screen flex justify-center items-center relative z-10 top-0">
      <div
        style={{ height: "50vh" }}
        className="text-black dark:text-white rounded-lg bg-white dark:bg-black relative w-1/2 dark-login-div flex justify-around items-center "
      >
        <div>
          <h1 className="animateGradientText text-center mt-4 text-2xl font-bold font-serif">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-50 text-center ">
            Please sign in to your account
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-50 text-center">
            {message.Message}
          </p>
        </div>
        <div className="flex flex-col h-full items-center justify-center">
          <div className=" flex flex-col">
            <p className="text-lg text-gray-950 font-semibold dark:text-gray-50 text-left">
              Enter Your UserName or Password
            </p>
            <input
              onChange={(e) => {
                setUser({
                  ...user,
                  UserNameOrEmail: e.target.value.trim().toLowerCase(),
                });
              }}
              type="text"
              placeholder="Enter Username Or Email Id"
              className="block h-6 p-4 border text-black bg-white border-black dark:border-white rounded-lg font-semibold text-sm mb-2"
            />
            <p className="text-lg text-gray-950 font-semibold dark:text-gray-50 text-left">
              Please sign in to your account
            </p>
            <input
              onChange={(e) => {
                setUser({ ...user, Password: e.target.value.trim() });
              }}
              type="password"
              placeholder="Enter Your Password"
              className="block h-6 p-4 border text-black bg-white border-black dark:border-white rounded-lg font-semibold text-sm"
            />
          </div>
          <div className="flex items-center flex-col mt-4">
            <button
              disabled={isDisable}
              onClick={handelClick}
              className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              SignIn
            </button>

            <p className="text-sm text-gray-600 dark:text-gray-50 text-center p-2">
              doesn't have an account?
              <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
