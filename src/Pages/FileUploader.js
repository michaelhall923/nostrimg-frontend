/** @jsxImportSource @emotion/react */
import axios from "axios";
import { css, keyframes } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiImage2Line, RiLoader4Fill } from "react-icons/ri";
import AuthModal from "../Components/AuthModal";

const fileUploaderStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  font-family: "Fira Code", monospace;
  cursor: pointer;
`;

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function FileUploader() {
  const [file, setFile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  // Create a ref for the file input element
  const fileInputRef = useRef(null);
  const imageIconRef = useRef(null);
  const loaderIconRef = useRef(null);
  const fileInputLabelRef = useRef(null);

  useEffect(() => {
    const handleUpload = async () => {
      fileInputLabelRef.current.classList.add("bg-violet-700");
      fileInputLabelRef.current.classList.remove("bg-indigo-900");
      imageIconRef.current.classList.add("hidden");
      loaderIconRef.current.classList.remove("hidden");
      const data = await uploadImage(file);

      navigate(data.route, {
        state: {
          lightningDestination: data.lightningDestination,
          lightningPaymentLink: data.lightningPaymentLink,
        },
      });
    };

    async function fetchData() {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/auth/verify",
        {
          withCredentials: true,
        }
      );
      const { isAuthenticated } = response.data;
      if (isAuthenticated) {
        setInterval(() => setIsAuthenticated(isAuthenticated), 2000);
      } else {
        setIsAuthenticated(isAuthenticated);
      }
    }
    fetchData();

    if (file) {
      handleUpload();
    }
  }, [file, navigate]);

  // Handle the drop event on the label
  const handleDrop = (event) => {
    // Prevent the default action (open the file in the browser)
    event.preventDefault();

    // Get the dropped file
    const file = event.dataTransfer.files[0];
    setFile(file);

    event.currentTarget.classList.add("bg-violet-700");
    event.currentTarget.classList.remove("bg-indigo-900");
    imageIconRef.current.classList.add("hidden");
    loaderIconRef.current.classList.remove("hidden");
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

  const rotationKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

  const rotationAnimation = css`
    transform-origin: center 75%;
    animation: ${rotationKeyframes} 2s linear infinite;
  `;

  return (
    <div>
      {isAuthenticated ? null : (
        <AuthModal setIsAuthenticatedCallback={setIsAuthenticated} />
      )}
      <label
        htmlFor="file"
        className={`bg-indigo-900 text-violet-300 font-bold`}
        css={fileUploaderStyle}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        ref={fileInputLabelRef}
      >
        <label htmlFor="file" className="cursor-pointer">
          <div className="max-w-xs">
            <h1 className="font-bold italic text-5xl w-full">Nostrimg</h1>
            <div ref={imageIconRef}>
              <RiImage2Line
                css={css`
                  padding-top: 100%;
                  /* margin-left: -100%; */
                  width: 100%;
                  height: 100%;
                  margin-top: -100%;
                `}
              />
            </div>
            <div className="hidden" ref={loaderIconRef}>
              <RiLoader4Fill
                css={css`
                  padding-top: 100%;
                  /* margin-left: -100%; */
                  width: 100%;
                  height: 100%;
                  margin-top: -100%;
                  ${rotationAnimation}
                `}
              />
            </div>
            <h3>Click or drag to upload.</h3>
            <h3>Supported formats: jpg/jpeg, png, webp, gif.</h3>
          </div>
        </label>
        <input
          id="file"
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
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
    </div>
  );
}

export default FileUploader;
