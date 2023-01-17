/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { RiLoader4Fill } from "react-icons/ri";

export default function Spinner({ className }) {
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
    <div className={`${className}`}>
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
  );
}
