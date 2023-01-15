import { useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex text-indigo-900 p-2 bg-violet-300 w-full border-b border-indigo-900 text-2xl font-bold italic">
      <Link to="/">Nostrimg</Link>
    </header>
  );
}

export default Header;
