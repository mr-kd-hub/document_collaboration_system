"use client";
import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { registerAction } from "../../redux/actions/auth.action";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/redux/slice/auth.slice";
import Loader from "@/app/loading";
import FallbackUI from "@/app/error";
import { Button, TextField } from "@mui/material";

function SignUpCompoent() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);  
  const router = useRouter()

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
      const status = await dispatch(registerAction({ ...values }));
      if (status === 200) {
        router.push("/");
        resetForm();
        return;
      }
      setValues({ ...values, error: "Already register" });
    },
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;
  const { email, password, error } = values;
  useEffect(()=>{
    dispatch(logout());
  },[dispatch])
  return (loading ? <div className="loading">
        <Loader />
      </div> :
    <Suspense fallback={<FallbackUI />}>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
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
                    error={!!(touched?.email && errors?.email)} 
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                    value={password}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    error={!!(touched?.password && errors?.password)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <Button
                variant="contained"
                disabled={loading}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create an account
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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

export default React.memo(SignUpCompoent);
