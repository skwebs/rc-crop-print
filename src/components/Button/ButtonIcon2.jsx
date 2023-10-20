import PropTypes from "prop-types";

const Button2 = ({ children, onClick, ...attr }) => {
  return (
    <button
      {...attr}
      className={`hover:-translate-y-[1px] px-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:text-slate-100 hover:bg-blue-800 transition-all duration-200`}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button2.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button2;
