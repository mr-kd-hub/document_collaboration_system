"use client";
import { RootState } from "@/app/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logout } from "@/app/redux/slice/auth.slice";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();

  console.log("pathName",pathName);
  
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/sign-in"); // Redirect to login page
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <></>
          <></>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {isAuthenticated ? (
                <li>
                  <Link
                    onClick={handleLogout}
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Log out
                  </Link>
                </li>
              ) : (
                pathName !== "/sign-in" && <li>
                    <Link
                      href="/sign-in"
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Sign in
                    </Link>
                  </li>
              )}
              {pathName !== "/sign-up" && <li>
                <Link
                  href="/sign-up"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Sign up
                </Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
