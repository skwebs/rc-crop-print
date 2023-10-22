import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const ButtonIcon = ({ children, onClick, className, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        className,
        `  w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded 
          element-hover`
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ButtonIcon;
