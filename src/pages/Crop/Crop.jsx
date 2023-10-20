import { PhotoIcon } from "@heroicons/react/24/solid";
import Cropper from "cropperjs";
import { useState, useRef, useEffect } from "react";
// import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css";
import Button from "../../components/Button/Button";
import { useCallback } from "react";
import { useMemo } from "react";
import { rowOfGrid } from "../../settings";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   setImageLoaded,
//   setCroppedCanvas,
//   setTargetImageWidth,
//   setTargetImageHeight,
//   setOriginalImageMimeType,
//   setBackgroundColor,
//   setNumRows,
//   setNumCols,
//   setOutputCanvasImageBlob,
//   selectCropState,
// } from "../../redux/cropStateSlice";

const Crop = () => {
  // const cropState = useSelector(selectCropState);
  // const dispatch = useDispatch();

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // ui
  const [showGridToolGroup, setshowGridToolGroup] = useState(false);
  const [showCropToolGroup, setShowCropToolGroup] = useState(false);
  const [showCropImage, setShowCropImage] = useState(false);
  // canvas
  const [targetImageWidth, setTargetImageWidth] = useState(360);
  const [targetImageHeight, setTargetImageHeight] = useState(450);

  const [originalImageMimeType, setOriginalImageMimeType] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [croppedCanvas, setCroppedCanvas] = useState(null);
  const [cropper, setCropper] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState("#008080");
  const [numRows, setNumRows] = useState(1);
  const [numCols, setNumCols] = useState(6);
  // canvas output
  const [outputCanvasImageBlob, setOutputCanvasImageBlob] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageRef.current.src = imageUrl;
      setOriginalImageMimeType(file.type);
      imageRef.current.onload = () => {
        setIsImageLoaded(true);
        initCropper();
      };
    }
  };

  const initCropper = () => {
    if (cropper) {
      cropper.destroy();
      setCropper(null);
    }

    const cropperInstance = new Cropper(imageRef.current, {
      viewMode: 3,
      dragMode: "move",
      aspectRatio: 4 / 5,
      autoCropArea: 1,
      restore: false,
      modal: false,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      ready() {
        imageRef.current.style.visibility = "visible";
      },
      crop(event) {
        if (event.detail.rotate !== 0) {
          // Handle reset rotate button
        }
      },
    });
    setCropper(cropperInstance);
  };

  const cropImage = () => {
    if (cropper) {
      const croppedImageData = cropper.getCroppedCanvas({
        width: targetImageWidth,
        height: targetImageHeight,
      });
      setCroppedCanvas(croppedImageData);
    }
  };

  // Wrap paperSizes initialization with useMemo
  const paperSizes = useMemo(() => {
    return {
      A4: { width: 2480, height: 3505 },
      "4x6": { width: 1200, height: 1800 },
      "5x7": { width: 1500, height: 2100 },
    };
  }, []);

  const paperSizeOptions = Object.entries(paperSizes).map(([label]) => {
    return (
      <option key={label} value={label}>
        Paper {label}
      </option>
    );
  });
  // const paperSizeOptions = Object.entries(paperSizes).map(([label, size]) => {
  //   return (
  //     <option key={label} value={label}>
  //       {label} ({size.width} x {size.height})
  //     </option>
  //   );
  // });

  let paperSize = paperSizes["A4"];

  // Wrap drawImageGrid with useCallback
  // const drawImageGrid = () => {
  //   logic goes here
  // };

  const drawImageGrid = useCallback(() => {
    if (isImageLoaded && croppedCanvas) {
      const outputCanvas = canvasRef.current;
      const ctx = outputCanvas.getContext("2d");

      const photoResolution = 300;
      const screenResolution = 96;
      const scaleFactor = photoResolution / screenResolution;

      console.log(scaleFactor);

      outputCanvas.width = paperSizes.A4.width;
      outputCanvas.height = paperSizes.A4.height;
      outputCanvas.style.maxWidth = `${paperSize.width / scaleFactor}px`;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

      const gap = 40;
      const margin = gap / 2;

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * (targetImageWidth + gap) + margin;
          const y = row * (targetImageHeight + gap) + margin;

          ctx.fillStyle = backgroundColor;
          ctx.fillRect(x, y, targetImageWidth, targetImageHeight);

          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;

          ctx.drawImage(
            croppedCanvas,
            x,
            y,
            targetImageWidth,
            targetImageHeight
          );
          ctx.strokeRect(x, y, targetImageWidth, targetImageHeight);
        }
      }

      outputCanvas.toBlob((blob) => {
        setOutputCanvasImageBlob(blob);
        console.log(blob);
      }, originalImageMimeType);
    }
  }, [
    isImageLoaded,
    croppedCanvas,
    originalImageMimeType,
    paperSizes,
    numRows,
    numCols,
    backgroundColor,
    paperSize.width,
    targetImageHeight,
    targetImageWidth,
  ]);

  useEffect(() => {
    if (croppedCanvas !== null) {
      drawImageGrid();
    }
  }, [croppedCanvas, drawImageGrid]);

  const downloadCanvas = () => {
    if (outputCanvasImageBlob) {
      const timestamp = new Date().getTime();
      const fileName = `IMG_${timestamp}.png`;
      const link = document.createElement("a");
      link.download = fileName;
      link.href = URL.createObjectURL(outputCanvasImageBlob);
      link.click();
    }
  };

  // components =========================================================================================================
  const cropToolGroup = (
    <>
      <div className={` py-2 flex gap-2`}>
        <Button onClick={cropImage}>Crop</Button>
      </div>
    </>
  );

  const gridRows = 10;
  const rowOptions = Array.from({ length: gridRows }).map((_, index) => {
    const rowNumber = index + 1;
    return (
      <option key={rowNumber} value={rowNumber}>
        Row {rowNumber}
      </option>
    );
  });
  const gridCols = 10;
  const colOptions = Array.from({ length: gridCols }).map((_, index) => {
    const colNumber = index + 1;
    return (
      <option key={colNumber} value={colNumber}>
        Column {colNumber}
      </option>
    );
  });

  const gridToolGroup = (
    <>
      <div className={` py-2 flex gap-2`}>
        <div className="">
          <select className="pl-3 pr-8 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {paperSizeOptions}
          </select>
        </div>

        <div className="">
          <select className="pl-3 pr-8 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {rowOptions}
          </select>
        </div>

        <div className="">
          <select className=" pl-3 pr-8 font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {colOptions}
          </select>
        </div>
        <button
          type="button"
          className="text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor"
            style={{ width: 20 }}>
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor"
            style={{ width: 20 }}>
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>

          <span className="sr-only">Icon description</span>
        </button>

        <button className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-9 h-9 flex justify-center items-center bg-gray-50 border border-gray-300 rounded hover:text-slate-100 hover:bg-blue-800 transition-all duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 500"
            fill="currentColor"
            style={{ width: 20 }}>
            <path d="M448 109.3l54.6-54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L402.7 64 160 64v64l178.7 0L128 338.7V32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H173.3L384 173.3 384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-274.7z" />
          </svg>
        </button>

        {/* <Button onClick={() => downloadCanvas()}>Re Crop</Button> */}
        <Button onClick={() => downloadCanvas()}>Download</Button>
      </div>
    </>
  );

  return (
    <>
      <div className="w-full">
        <div className="max-w-screen-xl p-8 mx-auto">
          <div className="max-w-screen-sm mx-auto">
            {/* crop tool group*/}
            {/* {isImageLoaded && croppedCanvas == null ? cropToolGroup : null} */}
            {/* {cropToolGroup} */}
            {/* <div
              className={`${
                isImageLoaded && croppedCanvas == null ? "" : "hidden"
              }`}>
              <Button onClick={cropImage}>Crop</Button>
            </div> */}
            {/* grid tool group */}
            {croppedCanvas ? gridToolGroup : null}
            {/* {gridToolGroup} */}
            {/* <div className={`${croppedCanvas ? "" : "hidden"} py-2 flex`}>
              <Button onClick={() => downloadCanvas()}>Download</Button>
              <div className="w-28">
                <select className="font-semibold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {paperSizeOptions}
                </select>
              </div>
            </div> */}

            {croppedCanvas ? (
              <canvas className={` w-full shadow-lg`} ref={canvasRef} />
            ) : null}

            {/* <canvas
              className={`${croppedCanvas ? "" : "hidden"} w-full shadow-lg`}
              ref={canvasRef}
            /> */}
            <div className="p-5 bg-white inline-block shadow ">
              <div
                className={`shadow ${isImageLoaded ? "" : "hidden"} ${
                  croppedCanvas ? "hidden" : ""
                } w-[300px] aspect-[4/5] overflow-hidden`}>
                <img
                  className="w-full"
                  ref={imageRef}
                  style={{ visibility: "hidden" }}
                />
              </div>
            </div>

            {isImageLoaded && croppedCanvas == null ? cropToolGroup : null}
            <div className={`${isImageLoaded ? "hidden" : ""} `}>
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <label
                htmlFor="file-upload"
                className="hover:scale-[0.98] focus-within:scale-[0.98] transition-all mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md  font-semibold">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        onChange={handleImageChange}
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crop;
