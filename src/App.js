/** @jsxImportSource @emotion/react */
import "./App.css";
import { useState, useEffect, useRef } from "react";
// import { Helmet } from "react-helmet";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useNavigate,
  useLocation,
  BrowserRouter,
  useParams,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";
import { css, keyframes } from "@emotion/react";
import {
  RiImage2Line,
  RiLoader4Fill,
  RiArrowLeftCircleLine,
  RiCheckFill,
} from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";

const imagePageStyle = css`
  width: 100%;
  max-width: 600px;
  margin: auto;
  min-height: 100vh;
  font-family: "Fira Code", sans-serif;
`;

const imgStyle = css``;

function ImagePage() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { fileName } = useParams();
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);
    if (copied) {
      navigator.clipboard.writeText(`https://i.nostrimg.com/${fileName}`);
    }

    return () => clearTimeout(timeout);
  }, [copied, fileName]);

  return (
    <div className="py-4 px-4 text-violet-400 font-bold" css={imagePageStyle}>
      <Helmet>
        <title>{fileName} | Nostrimg</title>
        <meta
          property="og:image"
          content={`https://i.nostrimg.com/${fileName}`}
        />
      </Helmet>
      <img
        className="mx-auto rounded"
        css={imgStyle}
        src={`https://i.nostrimg.com/${fileName}`}
        alt={fileName}
      />
      <h3 className="mb-4 py-8">
        <div>Direct Link:</div>
        <span
          className="bg-violet-400 text-indigo-900 p-2 rounded cursor-pointer break-all text-xs md:text-base"
          onClick={() => setCopied(true)}
        >
          https://i.nostrimg.com/{fileName}{" "}
          <span
            css={
              {
                // minHeight: "100vh",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            <button
              css={{
                appearance: "none",
                padding: 8,
                border: 0,
                outline: 0,
                cursor: "pointer",
              }}
            >
              <div
                css={{
                  position: "relative",
                  height: 16,
                  width: 16,
                }}
              >
                <Clippy
                  css={{
                    color: "rgb(192, 192, 192)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    strokeDasharray: 50,
                    strokeDashoffset: copied ? -50 : 0,
                    transition: "all 300ms ease-in-out",
                  }}
                />
                <Check
                  // isVisible={copied}
                  css={{
                    color: "rgb(64, 192, 0)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    strokeDasharray: 50,
                    strokeDashoffset: copied ? 0 : -50,
                    transition: "all 300ms ease-in-out",
                  }}
                />
              </div>
            </button>
          </span>
        </span>
      </h3>
      {location.state?.lightningPaymentLink ? (
        <a href={location.state.lightningPaymentLink}>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <QRCodeSVG
              className="p-1 rounded bg-violet-400 mb-2 md:mb-0"
              value={location.state.lightningPaymentLink}
              imageSettings={{
                src: "https://i.nostrimg.com/e59c502d.png",
                width: 20,
                height: 20,
                excavate: true,
              }}
            />
            <div className="flex flex-col">
              <h3 className="text-yellow-500 md:ml-16 mb-2 text-xs md:text-base">
                {/* Lightning: {location.state.lightningDestination} */}
                <RiArrowLeftCircleLine className="hidden md:inline" /> Tip Us
                Via Lightning
              </h3>
              <div className="bg-violet-400 text-indigo-900 p-2 rounded cursor-pointer break-all text-xs md:text-base md:ml-16">
                Open In Wallet
              </div>
            </div>
          </div>
        </a>
      ) : null}
    </div>
  );
}

function Clippy(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5.75 4.75H10.25V1.75H5.75V4.75Z" />
      <path d="M3.25 2.88379C2.9511 3.05669 2.75 3.37987 2.75 3.75001V13.25C2.75 13.8023 3.19772 14.25 3.75 14.25H12.25C12.8023 14.25 13.25 13.8023 13.25 13.25V3.75001C13.25 3.37987 13.0489 3.05669 12.75 2.88379" />
    </svg>
  );
}

function Check(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13.25 4.75L6 12L2.75 8.75" />
    </svg>
  );
}

const fileUploaderStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  font-family: "Fira Sans", sans-serif;
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
        className={`bg-indigo-900 text-violet-400 font-bold`}
        css={fileUploaderStyle}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        ref={fileInputLabelRef}
      >
        <label htmlFor="file" className="cursor-pointer">
          <div>
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
      className={`absolute flex flex-col items-center justify-center bg-violet-400 bg-opacity-95 w-full break-all h-full font-bold text-indigo-900 ${fadeProp.fade}`}
    >
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
              className="bg-indigo-900 text-violet-400 p-2 rounded"
            >
              Open In Wallet
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
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
