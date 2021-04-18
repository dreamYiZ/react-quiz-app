import http from "../http";

const post = (path, json) => {
  return http.post(path, json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

export { post };
