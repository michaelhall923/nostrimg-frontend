import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { RiFileCopyLine, RiCheckFill, RiCheckLine } from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";

function AuthModal() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasFetchedVerification, setHasFetchedVerification] = useState(false);
  const [invoiceCopied, setInvoiceCopied] = useState(false);
  const [authInit, setAuthInit] = useState(null);
  const [fadeProp, setFadeProp] = useState({
    fade: "",
    isFadingOut: false,
  });
  const hasFetchedInvoice = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (invoiceCopied) setInvoiceCopied(false);
    }, 2000);
    if (invoiceCopied) {
      navigator.clipboard.writeText(authInit.lightningDestination);
    }

    return () => clearTimeout(timeout);
  }, [invoiceCopied, authInit]);

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

    async function fetchVerification() {
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
    if (isAuthenticated === false) {
      const interval = setInterval(fetchVerification, 1000);
      return () => clearInterval(interval);
    }
    if (!hasFetchedVerification) {
      fetchVerification();
      setHasFetchedVerification(true);
    }
  }, [isAuthenticated, hasFetchedVerification]);

  if (isAuthenticated == null || isAuthenticated === true) {
    return null; // remove the overlay when authenticated
  }

  return (
    <div
      className={`fixed top-0 left-0 flex flex-col items-center justify-center bg-violet-400 bg-opacity-95 w-full break-word h-full font-bold text-indigo-900 ${fadeProp.fade}`}
    >
      <div className=" flex-grow flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-4 md:max-w-screen-xl mx-auto bg-violet-400 rounded-xl">
          <div className="mb-2 bg-violet-400 rounded">
            {fadeProp.isFadingOut
              ? "Authenticated!"
              : "Pay 123 SATS For Unlimited Access"}
          </div>
          {authInit && (
            <>
              <div className="mb-2">
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
              <button
                className="flex items-center p-2"
                onClick={(e) => {
                  setInvoiceCopied(true);
                }}
              >
                Copy Invoice
                <div className="ml-2 text-lg text-white">
                  {invoiceCopied ? (
                    <RiCheckLine />
                  ) : (
                    <RiFileCopyLine className="hover:text-indigo-900" />
                  )}
                </div>
              </button>
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

export default AuthModal;
