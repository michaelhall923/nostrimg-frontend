import "./App.css";
import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import ImagePage from "./Pages/ImagePage";
import Home from "./Pages/Home";
import Nips from "./Pages/Nips";
import GIFify from "./Pages/GIFify";

function App() {
  return (
    <div className="App bg-indigo-900 text-violet-300">
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
        <Route path="/" element={<Home />} />
        <Route path="/i/:fileName" element={<ImagePage />} />
        <Route path="/i/:hash/:fileName" element={<ImagePage />} />
        <Route path="/nips" element={<Nips />} />
        <Route path="/GIFify" element={<GIFify />} />
      </Routes>
    </div>
  );
}

export default App;
