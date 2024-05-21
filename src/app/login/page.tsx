"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  //INITIALISING ROUTER
  const router = useRouter();

  //STORING FORM INPUT DATA
  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  //SENDING TO DB
  const onLogin = async () => {
    try {

      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);

      router.push("/");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      //TODO: DISPLAY ERROR MESSAGE ON TOAST
    }
  };

  return (
    // <div className="flex flex-col gap-4 justify-center items-center">
    //   <h1>Login</h1>

    //   <input
    //     className="p-2 rounded w-[50%] text-black"
    //     id="email"
    //     type="email"
    //     value={user.email}
    //     onChange={(e) => SetUser({ ...user, email: e.target.value })}
    //     placeholder="email"
    //   />

    //   <input
    //     className="p-2 rounded w-[50%] text-black"
    //     id="password"
    //     type="password"
    //     value={user.password}
    //     onChange={(e) => SetUser({ ...user, password: e.target.value })}
    //     placeholder="password"
    //   />

    //   <div className="flex justify-around w-[50%]">
    //     <button
    //       className="bg-white text-black py-1 px-4 rounded"
    //       onClick={onLogin}
    //     >
    //       Login
    //     </button>
    //     <Link href="/signup">Sign Up Here</Link>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login Here
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => SetUser({ ...user, email: e.target.value })}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) => SetUser({ ...user, password: e.target.value })}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                onClick={onLogin}
                className="w-full text-white bg-[#FB4E48] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

  );
}
