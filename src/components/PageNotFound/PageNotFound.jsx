import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  });

  return (
    <>
      <div className=" min-h-screen flex flex-col">
        <Navigation />
        <section className="flex-1 flex items-center bg-white dark:bg-gray-900 ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                404
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Something&#39;s missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can&#39;t find that page. You&#39;ll find lots to
                explore on the home page.{" "}
              </p>
              <Link
                to={`/`}
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PageNotFound;
