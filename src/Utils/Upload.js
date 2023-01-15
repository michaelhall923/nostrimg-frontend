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
