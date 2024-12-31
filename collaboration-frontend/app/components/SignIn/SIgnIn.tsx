"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { loginAction } from "@/app/redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import Loader from "@/app/loading";
import FallbackUI from "@/app/error";
import { Button, TextField } from "@mui/material";

function SignInComponet() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const loading = useSelector((state: RootState) => state.auth.loading);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      error: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Passwors is required"),
    }),
    onSubmit: async (values, { resetForm, setValues }) => {
      const status = await dispatch(loginAction({ ...values }));
      if (status === 200) {
        router.push("/");
        resetForm();
        return;
      }
      setValues({ ...values, error: "Invalid details" });
    },
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;
  const { email, password, error } = values;
  console.log(":",errors);
  
  return (
    loading ? <div className="loading">
      <Loader />
    </div> : 
    <Suspense fallback={<FallbackUI />}>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <TextField
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    error={!!(touched?.error && errors?.email)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <TextField
                   name="password"
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={handleChange}
                   required
                   onBlur={handleBlur}
                   error={!!(touched?.password && errors?.password)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
               
                
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  // onClick={handleSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don`t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
                  </Link>
                </p>
                {error && <p>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default SignInComponet;
