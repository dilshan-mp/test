import { Image, cn } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  MailIcon,
} from "../assets/icons/incons";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm();

  const handleRegister = async (formData) => {
    console.log(formData);
    setIsLoading(true);

    try {
      await axios
        .post(`${BASE_URL}/api/user/register`, formData)
        .then(() => {
          reset();
        })
        .catch((error) => {
          console.log(error);
        });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="z-10 flex flex-col items-center flex-1 pt-16 text-white sm:justify-center sm:pt-0">
      <a href="#">
        <div className="flex items-center gap-2 mx-auto text-2xl font-semibold tracking-tighter text-foreground">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src="./logo.png"
              className={isLoading && "animate-spin"}
            />
            <p className="ml-2 text-4xl font-bold text-inherit">
              Space
              <span className="font-[700] bg-clip-text  text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                LAB
              </span>
            </p>
          </div>
        </div>
      </a>
      <div className="relative w-full max-w-lg mt-12 sm:mt-10">
        <div
          className="relative w-full h-px -mb-px bg-gradient-to-r from-transparent via-sky-300 to-transparent"
          bis_skin_checked="1"
        ></div>
        <div className="mx-5 border rounded-lg backdrop-blur-sm dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 border-white/20 border-l-white/20 border-r-white/20 lg:rounded-xl">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Register
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome, enter your details to register.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit(handleRegister)}>
              <div>
                <div>
                  <div className="flex group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      autoComplete="off"
                      variant="underlined"
                      className="block w-full p-0 text-sm bg-transparent border-0 file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      {...register("name", {
                        required: "Full Name is required!",
                      })}
                    />
                    <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  </div>
                  {errors.name && (
                    <p
                      role="alert"
                      className="mt-2 ml-2 text-xs font-semibold text-red-500"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="flex group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      variant="underlined"
                      className="block w-full p-0 text-sm bg-transparent border-0 file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      {...register("email", {
                        required: "Email is required!",
                        pattern: {
                          value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email.",
                        },
                      })}
                    />
                    <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  </div>
                  {errors.email && (
                    <p
                      role="alert"
                      className="mt-2 ml-2 text-xs font-semibold text-red-500"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div
                    className={cn(
                      "group relative rounded-lg border  px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:border-sky-200 focus-within:ring-sky-300/30"
                    )}
                  >
                    <div className="flex items-center">
                      <input
                        type={isVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        className="block w-full p-0 text-sm bg-transparent border-0 file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
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
                          <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                        ) : (
                          <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.password && (
                    <p
                      role="alert"
                      className="mt-2 ml-2 text-xs font-semibold text-red-500"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="outline-none focus:outline focus:outline-sky-300"
                  />
                  <span className="text-xs">Remember me</span>
                </label>
                <a
                  className="text-sm font-medium underline text-foreground"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center justify-end mt-4 gap-x-2">
                <Link
                  className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white"
                  to="/login"
                >
                  Login
                </Link>
                <button
                  className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-semibold text-black transition duration-300 bg-white rounded-md hover:bg-black hover:text-white hover:ring hover:ring-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
