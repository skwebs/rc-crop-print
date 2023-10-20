import Canvas from "./Canvas"
import MainLayout from "./layouts/MainLayout/MainLayout"

const App = () => {
  return (
    <>
      <MainLayout>
        <Canvas />
      </MainLayout>
    </>
  )
}

export default App

// import { useState, useRef } from 'react';
// import Cropper from 'react-cropper';
// import './App.css';

// const App = () => {
//   const [originalImageMimeType, setOriginalImageMimeType] = useState(null);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const [cropper, setCropper] = useState(null);
//   const [croppedCanvas, setCroppedCanvas] = useState(null);

//   const [targetImageWidth, setTargetImageWidth] = useState(360);
//   const [targetImageHeight, setTargetImageHeight] = useState(450);

//   const [backgroundColor, setBackgroundColor] = useState('#008080');
//   const [numRows, setNumRows] = useState(1);
//   const [numCols, setNumCols] = useState(6);

//   const [outputCanvasImageBlob, setOutputCanvasImageBlob] = useState(null);
//   const [paperSize, setPaperSize] = useState({ width: 2480, height: 3505 });
//   const [isLandscape, setIsLandscape] = useState(false);

//   const imageRef = useRef(null);
//   const canvasRef = useRef(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       imageRef.current.src = imageUrl;
//       setOriginalImageMimeType(file.type);
//       imageRef.current.onload = () => {
//         setIsImageLoaded(true);
//         initCropper();
//       };
//     }
//   };

//   const initCropper = () => {
//     if (cropper) {
//       cropper.destroy();
//     }

//     setCropper(new Cropper(imageRef.current, {
//       viewMode: 3,
//       dragMode: 'move',
//       aspectRatio: 4 / 5,
//       autoCropArea: 1,
//       restore: false,
//       modal: false,
//       highlight: false,
//       cropBoxMovable: false,
//       cropBoxResizable: false,
//       toggleDragModeOnDblclick: false,
//       ready() {
//         imageRef.current.style.visibility = 'visible';
//       },
//       crop(event) {
//         if (event.detail.rotate !== 0) {
//           // Handle reset rotate button
//         }
//       },
//     }));
//   };

//   const cropImage = () => {
//     if (cropper) {
//       setCroppedCanvas(cropper.getCroppedCanvas({
//         width: targetImageWidth,
//         height: targetImageHeight,
//       }));
//       drawImageGrid();
//     }
//   };

//   const drawImageGrid = () => {
//     if (isImageLoaded && croppedCanvas) {
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.fillStyle = 'white';
//       ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//       const gap = 40;
//       const margin = gap / 2;

//       for (let row = 0; row < numRows; row++) {
//         for (let col = 0; col < numCols; col++) {
//           const x = col * (targetImageWidth + gap) + margin;
//           const y = row * (targetImageHeight + gap) + margin;

//           ctx.fillStyle = backgroundColor;
//           ctx.fillRect(x, y, targetImageWidth, targetImageHeight);

//           ctx.strokeStyle = 'black';
//           ctx.lineWidth = 5;

//           ctx.drawImage(croppedCanvas, x, y, targetImageWidth, targetImageHeight);
//           ctx.strokeRect(x, y, targetImageWidth, targetImageHeight);
//         }
//       }

//       canvasRef.current.toBlob((blob) => {
//         setOutputCanvasImageBlob(blob);
//       }, originalImageMimeType);
//     }
//   };

//   const changePaperSize = (event) => {
//     const selectedPaperSize = event.target.value;
//     const paperSizes = {
//       A4: { width: 2480, height: 3508 },
//       '_4x6': { width: 1200, height: 1800 },
//       '_5x7': { width: 1500, height: 2100 },
//     };

//     setPaperSize(paperSizes[selectedPaperSize]);
//     changeCanvasOrientation();
//   };

//   // Add a function to change the canvas orientation
//   const changeCanvasOrientation = () => {
//     const { width, height } = paperSize;
//     canvasRef.current.width = isLandscape ? height : width;
//     canvasRef.current.height = isLandscape ? width : height;
//     drawImageGrid();
//   };

//   // Add a function to download the canvas image
//   const downloadCanvas = () => {
//     if (outputCanvasImageBlob) {
//       const timestamp = new Date().getTime();
//       const fileName = `IMG_${timestamp}.png`;
//       const link = document.createElement('a');
//       link.download = fileName;
//       link.href = URL.createObjectURL(outputCanvasImageBlob);
//       link.click();
//     }
//   };

//   // Add event handlers for various controls
//   return (
//     <div className="App">
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={cropImage}>Crop Image</button>
//       <div style={{ display: isImageLoaded ? 'block' : 'none' }}>
//         <img ref={imageRef} style={{ visibility: 'hidden' }} />
//       </div>

//       <canvas ref={canvasRef} />

//       <div>
//         <label>Background Color:</label>
//         <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
//       </div>

//       <div>
//         <label>Rows:</label>
//         <input type="number" value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value, 10))} />
//       </div>

//       <div>
//         <label>Columns:</label>
//         <input type="number" value={numCols} onChange={(e) => setNumCols(parseInt(e.target.value, 10))} />
//       </div>

//       <div>
//         <label>Paper Size:</label>
//         <select onChange={changePaperSize}>
//           <option value="A4">A4</option>
//           <option value="_4x6">4x6</option>
//           <option value="_5x7">5x7</option>
//         </select>
//       </div>

//       <div>
//         <label>Landscape:</label>
//         <input type="checkbox" checked={isLandscape} onChange={(e) => setIsLandscape(e.target.checked)} />
//       </div>

//       <button onClick={downloadCanvas}>Download Image</button>
//     </div>
//   );
// }

// export default App