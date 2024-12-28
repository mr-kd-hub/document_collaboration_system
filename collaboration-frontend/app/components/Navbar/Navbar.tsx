"use client";
import { RootState } from "@/app/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logout } from "@/app/redux/slice/auth.slice";
import { useRouter, usePathname } from "next/navigation";
import { setAuthStateAction } from "@/app/redux/actions/auth.action";

function Navbar() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log("isAuthenticated",isAuthenticated);
  
  const authDetail = useSelector(
    (state: RootState) => state.auth.detail
  );
  console.log("authDetail",authDetail);
  
  
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/sign-in"); // Redirect to login page
  };

  useEffect(()=>{
    dispatch(setAuthStateAction())
  },[dispatch])
  
  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 fixed w-full top-0 left-0 z-10">
      <div className="max-w-screen-xl flex justify-between items-center p-4 mx-auto">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-semibold text-blue-700 dark:text-white">
            Documents App
          </Link>
          {isAuthenticated && <div className="md:flex hidden space-x-6">
            <Link
              href="/"
              className={`py-2 px-3 rounded-md text-sm font-medium ${pathName === "/" ? "text-blue-700" : "text-gray-900 hover:text-blue-700"} dark:text-white dark:hover:text-blue-500`}
            >
              Documents
            </Link>
            <Link
              href="/create"
              className={`py-2 px-3 rounded-md text-sm font-medium ${pathName === "/create" ? "text-blue-700" : "text-gray-900 hover:text-blue-700"} dark:text-white dark:hover:text-blue-500`}
            >
              New Document
            </Link>
          </div>}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">
                {authDetail?.email}
              </div>
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-200"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              {pathName !== "/sign-in" && (
                <Link
                  href="/sign-in"
                  className="py-2 px-3 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  Sign in
                </Link>
              )}
              {pathName !== "/sign-up" && (
                <Link
                  href="/sign-up"
                  className="py-2 px-3 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-200"
                >
                  Sign up
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-gray-900 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="md:hidden space-y-4 p-4 bg-gray-50 dark:bg-gray-800">
        {isAuthenticated && <><Link
          href="/"
          className="block py-2 px-3 text-lg text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
        >
          Documents
        </Link>
        <Link
          href="/create"
          className="block py-2 px-3 text-lg text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
        >
          New Document
        </Link></>}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="block py-2 px-3 text-lg font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-200"
          >
            Log out
          </button>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="block py-2 px-3 text-lg text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="block py-2 px-3 text-lg text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
