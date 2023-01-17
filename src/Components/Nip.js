import { useState } from "react";

const MAX_CHARS = 240;

export default function Nip({ nip }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  let displaySummary = nip.summary;
  if (!expanded && nip.summary.length > MAX_CHARS) {
    displaySummary = nip.summary.substring(0, MAX_CHARS);
  }

  return (
    <div className="">
      <a
        href={`https://github.com/nostr-protocol/nips/blob/master/${nip.number}.md`}
      >
        <h2 className="underline hover:text-violet-300 inline-block">
          NIP-{nip.number}
        </h2>
      </a>
      <h3>{nip.title}</h3>
      <ul className="mt-2">
        {nip.bullets.map((bullet, index) => (
          <li className="text-left list-disc text-white text-sm italic mt-1">
            {bullet}
          </li>
        ))}
      </ul>
      <p className="text-sm text-violet-300 mt-2">
        {displaySummary}{" "}
        {!expanded && nip.summary.length > MAX_CHARS && (
          <button
            className="text-white hover:text-violet-300"
            onClick={handleClick}
          >
            [...]
          </button>
        )}
      </p>
    </div>
  );
}
