import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { RiCheckFill } from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";

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

  if (isAuthenticated == null || isAuthenticated === true) {
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

export default AuthModal;