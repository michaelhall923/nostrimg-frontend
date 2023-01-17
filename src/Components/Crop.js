/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

export default function Crop({ crop, onCropChange }) {
  const [isCropping, setIsCropping] = useState(false);
  const cropWindowRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsCropping(true);
    const rect = e.target.getBoundingClientRect();
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const newCrop = { ...crop };
    newCrop.x = x / width;
    newCrop.y = y / height;
    newCrop.width = 0;
    newCrop.height = 0;
    onCropChange(newCrop);
  };

  const handleMouseUp = (e) => {
    setIsCropping(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isCropping) {
        if (e.type === "touchmove") {
          e.preventDefault();
        }
        const rect = cropWindowRef.current.getBoundingClientRect();
        var clientX = e.clientX;
        var clientY = e.clientY;
        if (e.type === "touchmove") {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        }
        const newCrop = { ...crop };
        newCrop.width =
          (clientX - rect.x - newCrop.x * rect.width) / rect.width;
        newCrop.height =
          (clientY - rect.y - newCrop.y * rect.height) / rect.height;
        onCropChange(newCrop);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove, { passive: false });
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [isCropping, onCropChange]);

  const cropStyle = css`
    top: ${crop.y * 100}%;
    left: ${crop.x * 100}%;
    width: ${crop.width * 100}%;
    height: ${crop.height * 100}%;
  `;

  return (
    <div
      ref={cropWindowRef}
      className="absolute w-full h-full top-0 left-0 bg-gray-700 mix-blend-multiply cursor-crosshair select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      // onTouchStart={handleMouseDown}
    >
      <div
        className="absolute bg-white pointer-events-none"
        css={cropStyle}
      ></div>
    </div>
  );
}
