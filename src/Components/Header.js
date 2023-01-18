import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative flex justify-between text-indigo-900 p-2 bg-violet-300 w-full border-b border-indigo-900 text-2xl font-bold italic z-10">
      <Link to="/">𓅦 Nostrimg</Link>
      <div className="flex items-center text-xs md:text-base not-italic">
        <Link to="/" className="px-2">
          Upload
        </Link>
        |
        <Link to="/gifify" className="px-2">
          GIF-ify!
        </Link>
        |
        <Link to="/nips" className="px-2">
          NIPs
        </Link>
      </div>
    </header>
  );
}

export default Header;
