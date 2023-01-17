/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import AuthModal from "../Components/AuthModal";
import Crop from "../Components/Crop";
import FilePicker from "../Components/FilePicker";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import Spinner from "../Components/Spinner";
import { gifify } from "../Utils/Upload";

const gififyStyle = css`
  color: white;
  font-weight: bold;
  color: rgb(196, 181, 253);
  h1 {
    margin-top: 4rem;
    font-size: 4rem;
    color: white;
  }
  h2 {
    margin-top: 2rem;
    font-size: 2rem;
    color: white;
  }
  h3 {
    font-size: 1rem;
    color: white;
  }
`;

export default function GIFify() {
  const [file, setFile] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  });
  const [gifLength, setGIFLength] = useState(3.33);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = useCallback(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoSrc(fileUrl);
    } else {
      setVideoSrc(null);
    }
  }, [file]);

  const handleVideoTimeUpdate = (event) => {
    if (event.target.currentTime > gifLength) {
      event.target.currentTime = 0;
    }
  };

  const handleCropChange = useCallback((newCrop) => {
    if (newCrop.width < 0) {
      newCrop.x += newCrop.width;
      newCrop.width *= -1;
    }
    if (newCrop.height < 0) {
      newCrop.y += newCrop.height;
      newCrop.height *= -1;
    }
    if (newCrop.x < 0) {
      newCrop.width += newCrop.x;
      newCrop.x = 0;
    }
    if (newCrop.y < 0) {
      newCrop.height += newCrop.y;
      newCrop.y = 0;
    }
    if (newCrop.x + newCrop.width > 1) {
      newCrop.width = 1 - newCrop.x;
    }
    if (newCrop.y + newCrop.height > 1) {
      newCrop.height = 1 - newCrop.y;
    }
    setCrop((prev) => newCrop);
  }, []);

  useEffect(() => {
    if (file) {
      handleFileSelect();
    }
  }, [file, handleFileSelect]);

  const resetCrop = () => {
    handleCropChange({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
  };

  const resetAll = () => {
    setVideoSrc(null);
    handleCropChange({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    });
    setGIFLength(3.33);
  };

  const handleGIFLengthChange = (event, newValue) => {
    setGIFLength((prevValue) => newValue);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    const data = await gifify(file, crop, gifLength);

    navigate(data.route, {
      state: {
        lightningDestination: data.lightningDestination,
        lightningPaymentLink: data.lightningPaymentLink,
      },
    });
  };

  return (
    <div>
      <Helmet>
        <title>GIF-ify | Nostrimg</title>
      </Helmet>
      <Header />
      <div css={gififyStyle} className="px-4">
        <h1 className="mb-8">GIF-ify!</h1>
        {videoSrc ? (
          <div>
            <div>
              <button
                onClick={resetAll}
                className="bg-violet-300 text-indigo-900 p-1 mb-8 rounded ml-4"
              >
                Start Over
              </button>
            </div>
            <div
              css={css`
                @media (min-width: 40rem) {
                  max-width: 30rem;
                }

                @media (max-width: 40rem) {
                  max-width: 80%;
                }
              `}
              className="m-auto w-full relative mb-8"
            >
              <video
                loop
                muted
                playsInline
                autoPlay
                src={videoSrc}
                onTimeUpdate={handleVideoTimeUpdate}
                ref={videoRef}
              />
              <Crop crop={crop} onCropChange={handleCropChange} />
            </div>
            <div className="mb-8">
              Click and drag to crop{" "}
              <button
                onClick={resetCrop}
                className="bg-violet-300 text-indigo-900 p-1 rounded ml-4"
              >
                Reset Crop
              </button>
            </div>
            <div className="mb-8">
              <span className="inline-block w-40 text-left">
                Length: {gifLength}
              </span>
              <Slider
                step={0.01}
                defaultValue={gifLength}
                onChange={handleGIFLengthChange}
                max={
                  videoRef.current
                    ? Math.min(
                        Math.ceil(videoRef.current.duration * 100) / 100,
                        6.0
                      )
                    : 6.0
                }
                min={0.3}
              />
            </div>
            {isUploading ? (
              <Spinner className={`w-10 m-auto`} />
            ) : (
              <button
                onClick={handleSubmit}
                css={css`
                  width: 30rem;
                  max-width: 80%;
                `}
                className="bg-violet-300 text-indigo-900 p-2 mb-8 rounded"
              >
                Gif-ify!
              </button>
            )}
          </div>
        ) : (
          <div className="mb-8">
            <FilePicker
              fileType="video"
              file={file}
              setFile={setFile}
              isUploading={isUploading}
            />
          </div>
        )}
      </div>
      <AuthModal />
    </div>
  );
}
