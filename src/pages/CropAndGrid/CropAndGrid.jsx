import Cropper from "cropperjs";
import { useState, useRef, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import { useCallback } from "react";
import { useMemo } from "react";
import GridTools from "./SubComponents/GridTools";
import CropTools from "./SubComponents/CropTools";
import { useSelector, useDispatch } from "react-redux";
// import actions from cropSlice
import {
  setEnableCropImage,
  setIsImageLoaded,
  setOriginalImageMimeType,
  setTitle,
} from "../../store/slices/cropSlice";

const CropAndGrid = () => {
  const enableCropImage = useSelector((state) => state.enableCropImage);
  const isImageLoaded = useSelector((state) => state.isImageLoaded);
  const targetImageWidth = useSelector((state) => state.targetImageWidth);
  const targetImageHeight = useSelector((state) => state.targetImageHeight);
  const originalImageMimeType = useSelector(
    (state) => state.originalImageMimeType
  );
  const backgroundColor = useSelector((state) => state.backgroundColor);
  const numRows = useSelector((state) => state.numRows);
  const numCols = useSelector((state) => state.numCols);
  const dispatch = useDispatch();

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const [croppedCanvas, setCroppedCanvas] = useState(null);
  const [cropper, setCropper] = useState(null);

  // canvas output
  const [outputCanvasImageBlob, setOutputCanvasImageBlob] = useState(null);
  // set page title
  useEffect(() => {
    dispatch(setTitle("Crop & Grid"));
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageRef.current.src = imageUrl;
      setOriginalImageMimeType(file.type);
      imageRef.current.onload = () => {
        dispatch(setIsImageLoaded(true));
        dispatch(setEnableCropImage(true));
        setCroppedCanvas(null);
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

  const handleCropImage = () => {
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

  let paperSize = paperSizes["A4"];

  // Wrap drawImageGrid with useCallback
  const drawImageGrid = useCallback(() => {
    if (isImageLoaded && croppedCanvas) {
      dispatch(setEnableCropImage(false));

      const outputCanvas = canvasRef.current;
      const ctx = outputCanvas.getContext("2d");

      const photoResolution = 300;
      const screenResolution = 96;
      const scaleFactor = photoResolution / screenResolution;

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
    dispatch,
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

  useEffect(() => {
    if (enableCropImage) {
      setCroppedCanvas(null);
    }
  }, [enableCropImage]);

  // show components
  return (
    <>
      <div className="w-full">
        <div className="max-w-screen-xl p-8 mx-auto">
          <div className="max-w-screen-sm mx-auto">
            {/* 
            if image cropped
            then show grid 
             */}
            {croppedCanvas && (
              <>
                <GridTools
                  handleImageChange={handleImageChange}
                  colOptions={colOptions}
                  downloadCanvas={downloadCanvas}
                  paperSizeOptions={paperSizeOptions}
                  rowOptions={rowOptions}
                />
                <canvas className={` w-full shadow-lg`} ref={canvasRef} />
              </>
            )}

            {/*
             * if image loaded
             * then show crop image ui
             */}
            <div className={`${croppedCanvas && "hidden"}`}>
              <div
                className={`relative rounded p-5 hover:bg-white inline-block shadow-md bg-slate-100 transition-all duration-100`}>
                <div
                  className={`shadow flex justify-center flex-col relative border border-blue-500 w-60 max-w-xs aspect-[4/5] overflow-hidden`}>
                  <img
                    className="w-full"
                    ref={imageRef}
                    style={{ visibility: "hidden" }}
                  />

                  {!isImageLoaded && (
                    <div className="flex flex-col items-center  ">
                      <div className="flex items-center">
                        Below click on{" "}
                        <div className="p-1 rounded mx-2 shadow border ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6">
                            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                          </svg>
                        </div>{" "}
                      </div>
                      for uploading image.
                    </div>
                  )}
                </div>
              </div>
              {
                <CropTools
                  handleCropImage={handleCropImage}
                  handleImageChange={handleImageChange}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropAndGrid;
