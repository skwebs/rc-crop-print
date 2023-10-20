import PropTypes from "prop-types";
import ButtonIcon from "../../../components/Button/ButtonIcon";
import Select from "../../../components/select/Select";
import SelectHU from "../../../components/select/SelectHU";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLandscapeLayout,
  setEnableCropImage,
} from "../../../features/crop/cropSlice";

const GridTools = ({
  paperSizeOptions,
  rowOptions,
  colOptions,
  downloadCanvas,
  handleImageChange,
}) => {
  const dispatch = useDispatch();
  const isLandscapeLayout = useSelector((state) => state.isLandscapeLayout);
  return (
    <>
      <div className={` py-2 flex gap-2`}>
        <div>
          <Select title="Select Page Size">{paperSizeOptions}</Select>
        </div>
        <div>
          <Select title="Select Number of Row">{rowOptions}</Select>
        </div>
        <div>
          <Select title="Select Number of Column">{colOptions}</Select>
        </div>

        <div>
          {/* landscape */}
          <>
            <input
              type="checkbox"
              id="react-option"
              defaultValue
              checked={isLandscapeLayout}
              className="hidden peer"
              required
              onChange={(e) => dispatch(setIsLandscapeLayout(e.target.checked))}
            />
            <label
              htmlFor="react-option"
              className="h-8 w-9 hover:-translate-y-[1px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  flex justify-center items-center bg-gray-50 border border-gray-300 rounded  transition-all duration-100
                  text-gray-700  cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:text-blue-600  dark:peer-checked:text-gray-300 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              {isLandscapeLayout ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6"
                  viewBox="0 0 16 16">
                  <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 384 512">
                  <path d="M384 64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64l0-384zM128 192a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM80 356.6c0-37.9 30.7-68.6 68.6-68.6h86.9c37.9 0 68.6 30.7 68.6 68.6c0 15.1-12.3 27.4-27.4 27.4H107.4C92.3 384 80 371.7 80 356.6z" />
                </svg>
              )}
            </label>
          </>
        </div>

        <SelectHU />

        <label
          htmlFor="upload-img"
          className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:-translate-y-[1px] transition-all duration-100"
          title="Upload Image ">
          <input
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
        </label>

        <ButtonIcon
          title="Re Crop"
          onClick={() => dispatch(setEnableCropImage(true))}>
          <svg
            className="h-5"
            stroke="currentColor"
            strokeWidth={2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor">
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>
        </ButtonIcon>

        <ButtonIcon title="Download image" onClick={() => downloadCanvas()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </ButtonIcon>
      </div>
    </>
  );
};

GridTools.propTypes = {
  paperSizeOptions: PropTypes.array.isRequired, // Assuming paperSizeOptions is an array
  rowOptions: PropTypes.array.isRequired, // Assuming rowOptions is an array
  colOptions: PropTypes.array.isRequired, // Assuming colOptions is an array
  downloadCanvas: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};

export default GridTools;
