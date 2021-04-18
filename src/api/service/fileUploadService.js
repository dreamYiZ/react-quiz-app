import http from "../http";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/auth/upload", formData, {
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
