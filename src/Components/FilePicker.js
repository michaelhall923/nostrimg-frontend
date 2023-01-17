/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import { RiImage2Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const FilePicker = ({ setFile, file, isUploading, fileType }) => {
  const fileInputRef = useRef(null);
  const imageIconRef = useRef(null);
  const loaderIconRef = useRef(null);
  const fileInputLabelRef = useRef(null);
  const navigate = useNavigate();

  const fileUploaderStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-family: "Fira Code", monospace;
    cursor: pointer;

    h3 {
      color: white;
    }
  `;

  // Handle the drop event on the label
  const handleDrop = (event) => {
    // Prevent the default action (open the file in the browser)
    event.preventDefault();

    // Get the dropped file
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  // Handle the dragover event on the label
  const handleDragOver = (event) => {
    // Prevent the default action (open the file in the browser)
    event.preventDefault();

    // Add a class to the label to indicate that a file is being dragged over it
    event.currentTarget.classList.add("bg-violet-700");
    event.currentTarget.classList.remove("bg-indigo-900");
  };

  const handleDragLeave = (event) => {
    // Do something when the file is dragged away from the file input
    event.preventDefault();

    // Add a class to the label to indicate that a file is being dragged over it
    event.currentTarget.classList.remove("bg-violet-700");
    event.currentTarget.classList.add("bg-indigo-900");
  };

  useEffect(() => {
    if (typeof file === "undefined") {
      console.error("file prop is required");
    }
    if (typeof setFile === "undefined") {
      console.error("setFile prop is required");
    }
    if (typeof isUploading === "undefined") {
      console.error("isUploading prop is required");
    }

    const handleUpload = async () => {
      fileInputLabelRef.current.classList.add("bg-violet-700");
      fileInputLabelRef.current.classList.remove("bg-indigo-900");
      imageIconRef.current.classList.add("hidden");
      loaderIconRef.current.classList.remove("hidden");
    };

    if (isUploading) {
      handleUpload();
    }
  }, [setFile, isUploading, file, navigate]);

  const renderAccept = () => {
    switch (fileType) {
      case "image":
        return "image/jpeg,image/jpg,image/png,image/webp,image/gif";
      case "video":
        return "video/mp4,video/webm,video/avi,video/mov,video/h264";
      default:
        return "*";
    }
  };

  const renderSupportedFormats = () => {
    switch (fileType) {
      case "image":
        return "jpg/jpeg, png, webp, gif";
      case "video":
        return "mp4, webm, avi, mov, quicktime";
      default:
        return "all";
    }
  };

  return (
    <label
      htmlFor="file"
      className={`bg-indigo-900 text-violet-300 font-bold flex-grow`}
      css={fileUploaderStyle}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={fileInputLabelRef}
    >
      <label htmlFor="file" className="cursor-pointer">
        <div className="max-w-xs">
          <div ref={imageIconRef}>
            <RiImage2Line
              css={css`
                width: 100%;
                height: 100%;
              `}
            />
          </div>
          <div className="hidden" ref={loaderIconRef}>
            <Spinner />
          </div>
          <h3>Click or drag to upload</h3>
          <h3>Supported formats: {renderSupportedFormats()}</h3>
        </div>
      </label>
      <input
        id="file"
        ref={fileInputRef}
        type="file"
        accept={renderAccept()}
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        css={css`
          opacity: 0;
          position: absolute;
          z-index: -1;
        `}
      />
    </label>
  );
};

export default FilePicker;
