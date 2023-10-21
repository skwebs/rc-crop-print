import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button
      className={twMerge(
        className,
        `hover:-translate-y-[1px] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center`
      )}
      {...props}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
