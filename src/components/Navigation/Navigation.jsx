import { useState } from "react";
import Logo from "../Logo/Logo";
import PageScrollProgressBar from "../PageScrollProgressBar/PageScrollProgressBar";
import { NavLink, Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const navigation = [
  // { name: "Home", href: "/", current: true },
  // { name: "About", href: "/about", current: false },
  // { name: "Crop", href: "/crop", current: false },
  // { name: "CropAndGrid", href: "/crop-grid", current: false },
];

const Navigation = ({ className }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <PageScrollProgressBar />
      <div
        className={twMerge(
          className,
          "sticky w-full z-20 top-[2px] left-0 shadow-lg"
        )}>
        <nav className="bg-white dark:bg-gray-900 w-full z-20 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
            <span className="flex items-center">
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                <Link to={`/`} className="flex items-center">
                  <Logo />
                </Link>
              </span>
            </span>
            <div className="flex md:order-2">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Get started
              </button>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between ${
                openMenu ? "" : "hidden"
              } w-full md:flex md:w-auto md:order-1`}
              id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      onClick={() => setOpenMenu(false)}
                      aria-current="page"
                      to={item.href}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-sky-500 md:text-sky-500 md:dark:text-sky-300 md:bg-transparent"
                            : ""
                        } block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-500 md:p-0 md:dark:hover:text-sky-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
                      }>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;
