import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Select = ({ children, className, ...props }) => {
  return (
    <>
      <select
        id=""
        {...props}
        className={twMerge(
          className,
          "h-9 flex justify-center items-center rounded element-hover border-gray-300 caret-current pr-7 text-sm"
        )}>
        {children}
      </select>
    </>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Select;
