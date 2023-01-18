/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { css } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";
import {
  RiArrowLeftCircleLine,
  RiCheckLine,
  RiFileCopyLine,
} from "react-icons/ri";
import Header from "../Components/Header";

const imgStyle = css``;

const imagePageStyle = css`
  width: 100%;
  max-width: 600px;
  margin: auto;
  min-height: 100vh;
  font-family: "Fira Code", monospace;
`;

function ImagePage() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { fileName } = useParams();
  const [directLinkCopied, setDirectLinkCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (directLinkCopied) setDirectLinkCopied(false);
    }, 1000);
    if (directLinkCopied) {
      navigator.clipboard.writeText(`https://i.nostrimg.com/${fileName}`);
    }

    return () => clearTimeout(timeout);
  }, [directLinkCopied, fileName]);

  return (
    <div>
      <Helmet>
        <title>{fileName} | Nostrimg</title>
        <meta
          property="og:image"
          content={`https://i.nostrimg.com/${fileName}`}
        />
      </Helmet>
      <Header />
      <div className="py-4 px-4 text-violet-200 font-bold" css={imagePageStyle}>
        <img
          className="mx-auto rounded"
          css={imgStyle}
          src={`https://i.nostrimg.com/${fileName}`}
          alt={fileName}
        />
        <h3 className="mb-4 py-8">
          <div>Direct Link:</div>
          <button
            className="bg-violet-400 text-indigo-900 flex items-center p-2 rounded cursor-pointer break-word text-xs md:text-base"
            onClick={(e) => setDirectLinkCopied(true)}
          >
            https://i.nostrimg.com/{fileName}{" "}
            <div className="ml-2 text-lg text-white">
              {directLinkCopied ? (
                <RiCheckLine />
              ) : (
                <RiFileCopyLine className="hover:text-indigo-900" />
              )}
            </div>
          </button>
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
                  <RiArrowLeftCircleLine className="hidden md:inline" /> Tip Us
                  Via Lightning
                </h3>
                <div className="bg-violet-400 text-indigo-900 p-2 rounded cursor-pointer break-word text-xs md:text-base md:ml-16">
                  Open In Wallet
                </div>
              </div>
            </div>
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default ImagePage;
