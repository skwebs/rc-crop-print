import PropTypes from "prop-types";
import ButtonIcon from "../../../components/elements/Button/ButtonIcon";
import { useSelector } from "react-redux";

const CropTools = ({ handleCropImage, handleImageChange }) => {
  const isImageLoaded = useSelector((state) => state.isImageLoaded);

  return (
    <>
      <div className={` py-2 flex gap-2`}>
        <label
          htmlFor="upload-img"
          className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:-translate-y-[1px] transition-all duration-100"
          title="Upload Image ">
          <input
            accept="image/jpeg, image/png, image/svg+xml"
            type="file"
            id="upload-img"
            className="sr-only"
            onChange={handleImageChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5">
            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
        </label>{" "}
        <ButtonIcon
          onClick={handleCropImage}
          disabled={!isImageLoaded}
          className={`${!isImageLoaded && " text-gray-400"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor"
            style={{ width: 20 }}>
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>
        </ButtonIcon>
      </div>
    </>
  );
};

CropTools.propTypes = {
  handleCropImage: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};

export default CropTools;
