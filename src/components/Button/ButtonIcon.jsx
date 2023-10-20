import PropTypes from "prop-types";

const ButtonIcon = ({ children, onClick, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:-translate-y-[1px] transition-all duration-100`}
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
