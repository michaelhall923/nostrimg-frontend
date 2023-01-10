/** @jsxImportSource @emotion/react */
import "./App.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { css, keyframes } from "@emotion/react";
import { RiImage2Line, RiLoader4Fill, RiCheckFill } from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";
import ImagePage from "./Pages/ImagePage";

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

    // Remove the dragover class from the label
    // event.currentTarget.classList.add("bg-indigo-900");
    // event.currentTarget.classList.remove("bg-violet-700");

    // Get the dropped file
    const file = event.dataTransfer.files[0];
    setFile(file);

    event.currentTarget.classList.add("bg-violet-700");
    event.currentTarget.classList.remove("bg-indigo-900");
    imageIconRef.current.classList.add("hidden");
    loaderIconRef.current.classList.remove("hidden");

    // Update the file input with the dropped file
    // fileInputRef.current.files = event.dataTransfer.files;

    // Update the file name state
    // setFileName(file.name);

    // Dispatch a change event on the file input
    // fileInputRef.current.dispatchEvent(new Event("change"));
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

function AuthModal({ setIsAuthenticatedCallback }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authInit, setAuthInit] = useState(null);
  const [fadeProp, setFadeProp] = useState({
    fade: "",
    isFadingOut: false,
  });
  const hasFetchedInvoice = useRef(false);

  useEffect(() => {
    async function fetchAuthInit() {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/auth/init",
        {
          withCredentials: true,
        }
      );
      setAuthInit(response.data);
    }

    async function fetchData() {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/auth/verify",
        {
          withCredentials: true,
        }
      );
      const { isAuthenticated } = response.data;
      if (isAuthenticated) {
        setFadeProp({
          fade: "",
          isFadingOut: true,
        });
        setInterval(() => {
          setFadeProp({
            fade: "opacity-0 transition duration-1000",
            isFadingOut: true,
          });
          setInterval(() => {
            setIsAuthenticated(isAuthenticated);
            setIsAuthenticatedCallback(isAuthenticated);
          }, 1000);
        }, 1000);
      } else {
        setIsAuthenticated(isAuthenticated);
        if (!hasFetchedInvoice.current) {
          fetchAuthInit();
          hasFetchedInvoice.current = true;
        }
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [setIsAuthenticatedCallback]);

  if (
    isAuthenticated == null ||
    // (isAuthenticated === false && !authInit) ||
    isAuthenticated === true
  ) {
    return null; // remove the overlay when authenticated
  }

  return (
    <div
      className={`absolute flex flex-col items-center justify-center bg-violet-400 bg-opacity-95 w-full break-word h-full font-bold text-indigo-900 ${fadeProp.fade}`}
    >
      <div className=" flex-grow flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-4 md:max-w-screen-xl mx-auto bg-violet-400 rounded-xl">
          <div className="mb-2 bg-violet-400 rounded">
            {fadeProp.isFadingOut
              ? "Authenticated!"
              : "Pay 100 SATS To Prove You're Human"}
          </div>
          {authInit && (
            <>
              <div className="mb-2">
                {/* {authInit.lightningDestination} */}
                {fadeProp.isFadingOut ? (
                  <RiCheckFill className="text-green-500 text-9xl" />
                ) : (
                  <a href={authInit.lightningPaymentLink}>
                    <QRCodeSVG
                      className="rounded bg-violet-400"
                      value={authInit.lightningPaymentLink}
                      size="200"
                      imageSettings={{
                        src: "https://i.nostrimg.com/e59c502d.png",
                        width: 20,
                        height: 20,
                        excavate: true,
                      }}
                    />
                  </a>
                )}
              </div>
              <a
                href={authInit.lightningPaymentLink}
                className="bg-indigo-900 text-violet-300 p-2 rounded"
              >
                Open In Wallet
              </a>
            </>
          )}
        </div>
      </div>
      <div className="text-violet-300 p-2 bg-indigo-900 w-full border-t border-violet-300">
        Delivered lightning fast ⚡️ w/ S3+Cloudfront
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-indigo-900">
        <Helmet>
          <title>Nostrimg</title>
          <meta
            name="description"
            content="Nostrimg is Nostr-native image hosting service."
          />
          <meta name="keywords" content="image hosting, nostr" />
          <meta
            property="og:image"
            content="https://i.nostrimg.com/29112b4c.png"
            data-rh="true"
          />
        </Helmet>
        <Routes>
          <Route path="/" element={<FileUploader />} />
          <Route path="/i/:fileName" element={<ImagePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

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

export default App;
