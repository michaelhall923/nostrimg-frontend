/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Helmet } from "react-helmet-async";
import { RiGithubFill } from "react-icons/ri";
import Header from "../Components/Header";
import Nip from "../Components/Nip";
import { nips } from "../Utils/Constants";

const nipsStyle = css`
  color: white;
  font-weight: bold;
  color: rgb(196, 181, 253);
  text-align: left;
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

function Nips() {
  return (
    <div>
      <Helmet>
        <title>NIPs | Nostrimg</title>
      </Helmet>
      <Header />
      <div className={`max-w-3xl m-auto px-4 mb-8`} css={nipsStyle}>
        <h1>NIPs</h1>
        <a href="https://github.com/nostr-protocol/nips">
          <h3>
            View The Full NIPs On Github{" "}
            <RiGithubFill
              css={{
                display: "inline",
              }}
            />
          </h3>
        </a>

        {nips.map((nip, index) => (
          <Nip nip={nip} />
        ))}
      </div>
    </div>
  );
}

export default Nips;
