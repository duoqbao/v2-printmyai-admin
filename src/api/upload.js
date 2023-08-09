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
export const uploadImage = (event) => {
  if (event) {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        event, // the file from input
        1920,
        1080,
        "PNG", // compress format WEBP, JPEG, PNG
        90, // quality
        0, // rotation
        async (uri) => {
          try {
            let formData = new FormData();
            const dataURI = dataURItoBlob(uri);
            formData.append("file", dataURI);
            const data = await api.post(`${API_URL}/upload/admin`, formData);
            resolve(data.data);
          } catch (err) {
            reject(err);
          }
        },
        "base64" //
      );
    });
  }
};
