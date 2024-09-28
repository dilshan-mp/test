import { Image, cn, Spinner } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  MailIcon,
} from "../assets/icons/incons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../context/authContext";
import { Meteors } from "../components/ui/meteors";
import { BASE_URL } from "../constants";

const Login = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const { loading, error, dispatch } = useContext(AuthContext);

  const onSubmit = async (formData) => {
    console.log(formData);
    setIsLoading(true);
    dispatch({ type: "LOGIN_START" });

    await axios
      .post(`${BASE_URL}/api/user/auth`, formData)
      .then((res) => {
        reset();

        toast("logging successful");
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      })
      .catch((error) => {
        setError("email", {
          type: "custom",
          message: error.response.data.message,
        });
        setError("password", {
          type: "custom",
          message: error.response.data.message,
        });
        console.log(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <div className=" text-white flex flex-1 flex-col items-center pt-16 sm:justify-center sm:pt-0 z-10">
      <Meteors number={2} />

      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src="./logo.png"
              className={isLoading && " animate-spin"}
            />
            <p className="font-bold text-inherit ml-2 text-4xl">
              Space
              <span className="font-[700] bg-clip-text  text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                LAB
              </span>
            </p>
          </div>
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div
          className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked="1"
        ></div>
        <div className="backdrop-blur-sm mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20    rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div>
                  <div className="flex group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      variant="underlined"
                      className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      {...register("email", {
                        required: "Email is required!",
                        pattern: {
                          message: "Invalid email!",
                          value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                        },
                      })}
                    />
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  </div>
                  {errors.email && (
                    <p role="alert" className="text-xs mt-2 ml-2 text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div>
                  <div
                    className={cn(
                      "group relative rounded-lg border  px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring          focus-within:border-sky-200 focus-within:ring-sky-300/30"
                    )}
                  >
                    <div className="flex items-center">
                      <input
                        type={isVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        {...register("password", {
                          required: "Password is required!",
                        })}
                      />
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p role="alert" className="text-xs mt-2 ml-2 text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    class="outline-none focus:outline focus:outline-sky-300"
                  />
                  <span class="text-xs">Remember me</span>
                </label>
                <a
                  class="text-sm font-medium text-foreground underline"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <div class="mt-4 flex items-center justify-end gap-x-2">
                <Link
                  type="button"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                  to="/register"
                >
                  Register
                </Link>
                <button
                  class="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner data-testid="spinner" /> : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
