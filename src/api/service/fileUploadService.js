import http from "../http";
import { PATH_UPLOAD } from "../path";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post(PATH_UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  }).then(res=>{
    console.log('file upload res:', res);
    const { data: {fid}} = res;
    return fid;
  });
};

export { upload };
