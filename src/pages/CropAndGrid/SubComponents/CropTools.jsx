import PropTypes from "prop-types";
import ButtonIcon from "../../../components/elements/Button/ButtonIcon";
import { useSelector } from "react-redux";

const CropTools = ({
  handleCropImage,
  handleImageChange,
  handleRotate,
  handleFlip,
  handleResetRotate,
  handleResetAll,
  rotateValue,
}) => {
  const isImageLoaded = useSelector((state) => state.isImageLoaded);

  return (
    <>
      <div className={` py-2 flex gap-2 flex-wrap items-center`}>
        <div>
          <input
            accept="image/jpeg, image/png, image/svg+xml"
            type="file"
            id="upload-img"
            className="sr-only peer"
            onChange={handleImageChange}
          />
          <label
            htmlFor="upload-img"
            className="label-hover w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded cursor-pointer shadow-sm hover:bg-white transition-colors"
            title="Upload Image ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5">
              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
          </label>
        </div>

        <ButtonIcon
          title="Crop Image"
          onClick={handleCropImage}
          disabled={!isImageLoaded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor"
            style={{ width: 20 }}>
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>
        </ButtonIcon>

        <ButtonIcon
          title="Flip Horizontally"
          onClick={() => handleFlip("h")}
          disabled={!isImageLoaded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            style={{ width: 20 }}
            viewBox="10 0 500 400">
            <path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
          </svg>
        </ButtonIcon>

        <ButtonIcon
          title="Flip Vertically"
          onClick={() => handleFlip("v")}
          disabled={!isImageLoaded}>
          <svg
            style={{ height: 20 }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 320 512">
            <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3V402.7L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7V109.3l41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z" />
          </svg>
        </ButtonIcon>

        <button
          className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
          onClick={handleResetRotate}
          disabled={!isImageLoaded || rotateValue === 0}>
          Reset Rotate
        </button>

        <button
          className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
          onClick={handleResetAll}
          disabled={!isImageLoaded}>
          Reset All
        </button>

        <div className="flex flex-col w-full mt-2">
          <input
            type="range"
            min="-90"
            max="90"
            step="0.01"
            value={rotateValue}
            onChange={(e) => handleRotate(e.target.value)}
            disabled={!isImageLoaded}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-gray-500 px-1 mt-1">
            <span>-90°</span>
            <span>0°</span>
            <span>90°</span>
          </div>
        </div>
      </div>
    </>
  );
};

CropTools.propTypes = {
  handleCropImage: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired,
  handleFlip: PropTypes.func.isRequired,
  handleResetRotate: PropTypes.func.isRequired,
  handleResetAll: PropTypes.func.isRequired,
  rotateValue: PropTypes.number.isRequired,
};

export default CropTools;
