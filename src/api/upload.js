import api from "axios";
import { API_URL } from "./index.js";
import Resizer from "react-image-file-resizer";
export const dataURItoBlob = (dataURI) => {
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};
export const uploadImage = async (event) => {
  if (event) {
    try {
      let formData = new FormData();
      formData.append("file", event);
      const { data } = await api.post(`${API_URL}/upload/admin`, formData);
      return data;
    } catch (err) {
      throw err;
    }
  }
};
