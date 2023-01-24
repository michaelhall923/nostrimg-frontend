import axios from "axios";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function tinify(imageUrl) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/api/upload/tinify",
      { params: { imageUrl: imageUrl } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function gifify(file, crop, length) {
  const formData = new FormData();
  formData.append("video", file);
  formData.append("crop", JSON.stringify(crop));
  formData.append("length", length);

  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/upload/gifify",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
