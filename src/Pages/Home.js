/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../Components/AuthModal";
import Header from "../Components/Header";
import FilePicker from "../Components/FilePicker";
import { uploadImage } from "../Utils/Upload";

export default function Home() {
  const [file, setFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function handleUpload() {
      const data = await uploadImage(file);

      navigate(data.route, {
        state: {
          lightningDestination: data.lightningDestination,
          lightningPaymentLink: data.lightningPaymentLink,
        },
      });
    }

    if (file) {
      setIsUploading(true);
      handleUpload();
    }
  }, [file, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <FilePicker file={file} setFile={setFile} isUploading={isUploading} />
      <AuthModal />
    </div>
  );
}
