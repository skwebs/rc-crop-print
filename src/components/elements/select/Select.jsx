import PropTypes from "prop-types";

const Select = ({ children, ...rest }) => {
  return (
    <>
      <select
        {...rest}
        className="caret-current px-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:-translate-y-[1px] transition-all duration-100
          pl-3 pr-8 font-semibold  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500  p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {children}
      </select>
    </>
  );
};

Select.propTypes = {
  children: PropTypes.node,
};

export default Select;
