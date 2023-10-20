import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isImageLoaded: false,
  croppedCanvas: null,
  targetImageWidth: 360,
  targetImageHeight: 450,
  originalImageMimeType: null,
  backgroundColor: "#008080",
  numRows: 1,
  numCols: 6,
  outputCanvasImageBlob: null,

  // new ==================================================================
  enableCropImage: false,
  enableCropTool: false,
  enableGridTool: false,
  paperSize: "A4",
  isLandscapeLayout: false,
};

export const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    setIsImageLoaded(state, action) {
      state.isImageLoaded = action.payload;
    },
    setCroppedCanvas(state, action) {
      state.croppedCanvas = action.payload;
    },
    setTargetImageWidth(state, action) {
      state.targetImageWidth = action.payload;
    },
    setTargetImageHeight(state, action) {
      state.targetImageHeight = action.payload;
    },
    setOriginalImageMimeType(state, action) {
      state.originalImageMimeType = action.payload;
    },
    setBackgroundColor(state, action) {
      state.backgroundColor = action.payload;
    },
    setNumRows(state, action) {
      state.numRows = action.payload;
    },
    setNumCols(state, action) {
      state.numCols = action.payload;
    },
    setOutputCanvasImageBlob(state, action) {
      state.outputCanvasImageBlob = action.payload;
    },

    // new ==================================================================
    setEnableCropImage(state, action) {
      state.enableCropImage = action.payload;
    },
    setEnableCropTool(state, action) {
      state.enableCropTool = action.payload;
    },
    setEnableGridTool(state, action) {
      state.enableGridTool = action.payload;
    },
    setPaperSize(state, action) {
      state.paperSize = action.payload;
    },
    setIsLandscapeLayout(state, action) {
      state.isLandscapeLayout = action.payload;
    },
  },
});

export const {
  setIsImageLoaded,
  setCroppedCanvas,
  setTargetImageWidth,
  setTargetImageHeight,
  setOriginalImageMimeType,
  setBackgroundColor,
  setNumRows,
  setNumCols,
  setOutputCanvasImageBlob,

  setEnableCropImage,
  setEnableCropTool,
  setEnableGridTool,
  setPaperSize,
  setIsLandscapeLayout,
} = cropSlice.actions;

export default cropSlice.reducer;
