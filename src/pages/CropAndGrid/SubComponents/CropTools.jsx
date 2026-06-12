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

        <ButtonIcon
          title="Reset All"
          onClick={handleResetAll}
          disabled={!isImageLoaded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            fill="currentColor"
            style={{ width: 18 }}>
            <path d="M320 128C426 128 512 214 512 320C512 426 426 512 320 512C254.8 512 197.1 479.5 162.4 429.7C152.3 415.2 132.3 411.7 117.8 421.8C103.3 431.9 99.8 451.9 109.9 466.4C156.1 532.6 233 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C234.3 64 158.5 106.1 112 170.7L112 144C112 126.3 97.7 112 80 112C62.3 112 48 126.3 48 144L48 256C48 273.7 62.3 288 80 288L104.6 288C105.1 288 105.6 288 106.1 288L192.1 288C209.8 288 224.1 273.7 224.1 256C224.1 238.3 209.8 224 192.1 224L153.8 224C186.9 166.6 249 128 320 128zM344 216C344 202.7 333.3 192 320 192C306.7 192 296 202.7 296 216L296 320C296 326.4 298.5 332.5 303 337L375 409C384.4 418.4 399.6 418.4 408.9 409C418.2 399.6 418.3 384.4 408.9 375.1L343.9 310.1L343.9 216z" />
          </svg>
        </ButtonIcon>

        <div className="flex flex-col w-full mt-2">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="-90"
              max="90"
              step="0.01"
              value={rotateValue}
              onChange={(e) => handleRotate(e.target.value)}
              disabled={!isImageLoaded}
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none accent-blue-600 transition-all ${
                isImageLoaded ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            />
            <ButtonIcon
              title="Reset Rotation"
              onClick={handleResetRotate}
              disabled={!isImageLoaded || rotateValue === 0}
              className="w-8 h-8 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                fill="currentColor"
                style={{ width: 16 }}>
                <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z" />
              </svg>
            </ButtonIcon>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 px-1 mt-1 pr-10">
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
