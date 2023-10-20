import React from 'react'

const About = () => {
    return (
        <div>About</div>
    )
}

export default About


// import { PhotoIcon } from '@heroicons/react/24/solid';
// import Cropper from 'cropperjs';
// import { useState, useRef } from 'react';
// // import { Cropper } from 'react-cropper';
// import "cropperjs/dist/cropper.css";

// const About = () => {

//     const imageRef = useRef(null);
//     const canvasRef = useRef(null);


//     const [targetImageWidth, setTargetImageWidth] = useState(360);
//     const [targetImageHeight, setTargetImageHeight] = useState(450);

//     const [originalImageMimeType, setOriginalImageMimeType] = useState(null);
//     const [isImageLoaded, setIsImageLoaded] = useState(false);
//     const [croppedCanvas, setCroppedCanvas] = useState(null);
//     const [cropper, setCropper] = useState(null);



//     const [backgroundColor, setBackgroundColor] = useState('#008080');
//     const [numRows, setNumRows] = useState(1);
//     const [numCols, setNumCols] = useState(6);


//     const [outputCanvasImageBlob, setOutputCanvasImageBlob] = useState(null);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             // console.log(file)
//             const imageUrl = URL.createObjectURL(file);
//             imageRef.current.src = imageUrl;
//             // console.log(imageUrl)
//             setOriginalImageMimeType(file.type);
//             imageRef.current.onload = () => {
//                 setIsImageLoaded(true);
//                 initCropper();
//             };
//         }
//     };

//     const initCropper = () => {
//         if (cropper) {
//             cropper.destroy();
//         }

//         setCropper(new Cropper(imageRef.current, {
//             viewMode: 3,
//             dragMode: 'move',
//             aspectRatio: 4 / 5,
//             autoCropArea: 1,
//             restore: false,
//             modal: false,
//             highlight: false,
//             cropBoxMovable: false,
//             cropBoxResizable: false,
//             toggleDragModeOnDblclick: false,
//             ready() {
//                 imageRef.current.style.visibility = 'visible';
//             },
//             crop(event) {
//                 if (event.detail.rotate !== 0) {
//                     // Handle reset rotate button
//                 }
//             },
//         }));
//     };


//     const cropImage = () => {
//         if (cropper) {
//             setCroppedCanvas(cropper.getCroppedCanvas({
//                 width: targetImageWidth,
//                 height: targetImageHeight,
//             }));

//             // croppedCanvas.toBlob((blob) => {
//             //     setOutputCanvasImageBlob(blob);
//             //     console.log(blob)
//             // }, originalImageMimeType);

//             // console.log(croppedCanvas)
//             if (croppedCanvas) {
//                 console.log("cropped canvas")
//                 drawImageGrid()
//             }
//         }
//     };



//     const drawImageGrid = () => {
//         console.log("enter in drawImageGrid")

//         if (isImageLoaded) {
//             console.log("isImageLoaded")
//         }
//         if (croppedCanvas) {
//             console.log("croppedCanvas")
//         }

//         if (isImageLoaded && croppedCanvas) {
//             const ctx = canvasRef.current.getContext('2d');
//             ctx.fillStyle = 'white';
//             ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//             const gap = 40;
//             const margin = gap / 2;

//             for (let row = 0; row < numRows; row++) {
//                 for (let col = 0; col < numCols; col++) {
//                     const x = col * (targetImageWidth + gap) + margin;
//                     const y = row * (targetImageHeight + gap) + margin;

//                     ctx.fillStyle = backgroundColor;
//                     ctx.fillRect(x, y, targetImageWidth, targetImageHeight);

//                     ctx.strokeStyle = 'black';
//                     ctx.lineWidth = 5;

//                     ctx.drawImage(croppedCanvas, x, y, targetImageWidth, targetImageHeight);
//                     ctx.strokeRect(x, y, targetImageWidth, targetImageHeight);
//                 }
//             }

//             canvasRef.current.toBlob((blob) => {
//                 setOutputCanvasImageBlob(blob);
//                 console.log(blob)
//             }, originalImageMimeType);
//         }
//     };

//     return (
//         <>
//             <button onClick={() => cropImage()}>Crop</button>
//             <div className='w-full'>
//                 <div className="max-w-screen-xl p-8 mx-auto">
//                     <div className='max-w-screen-sm mx-auto'>

//                         <canvas ref={canvasRef} />

//                         <div className={`${isImageLoaded ? "" : "hidden"} w-[200px] aspect-[4/5] `} >
//                             <img className='w-full' ref={imageRef} style={{ visibility: 'hidden' }} />
//                         </div>

//                         <div className={`${isImageLoaded ? "hidden" : ""} `}>
//                             <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Cover photo
//                             </label>
//                             <label htmlFor="file-upload" className="hover:scale-[0.98] focus-within:scale-[0.98] transition-all mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
//                                 <div className="text-center">
//                                     <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//                                     <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                                         <label
//                                             htmlFor="file-upload"
//                                             className="relative cursor-pointer rounded-md  font-semibold"
//                                         >
//                                             <span>Upload a file</span>
//                                             <input id="file-upload" onChange={handleImageChange} name="file-upload" type="file" className="sr-only" />
//                                         </label>
//                                         <p className="pl-1">or drag and drop</p>
//                                     </div>
//                                     <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
//                                 </div>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default About