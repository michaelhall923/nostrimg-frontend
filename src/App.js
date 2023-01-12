import "./App.css";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImagePage from "./Pages/ImagePage";
import FileUploader from "./Pages/FileUploader";
import Nips from "./Pages/Nips";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-indigo-900">
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
          <Route path="/" element={<FileUploader />} />
          <Route path="/i/:fileName" element={<ImagePage />} />
          <Route path="/nips" element={<Nips />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
