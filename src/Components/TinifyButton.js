import { useState } from "react";
import { useNavigate } from "react-router";
import { tinify } from "../Utils/Upload";
import Spinner from "./Spinner";

function TinifyButton({ imageUrl, className }) {
  const navigate = useNavigate();
  const [isTinifying, setIsTinifying] = useState(false);

  async function handleClick() {
    if (!isTinifying) {
      setIsTinifying(true);
      const data = await tinify(imageUrl);

      navigate(data.route, {
        state: {
          lightningDestination: data.lightningDestination,
          lightningPaymentLink: data.lightningPaymentLink,
        },
      });
    }
  }

  return (
    // <div>
    <button className={className} onClick={handleClick}>
      {isTinifying ? <Spinner className="w-6 mx-auto" /> : <>Tinify!</>}
    </button>
    // </div>
  );
}

export default TinifyButton;
