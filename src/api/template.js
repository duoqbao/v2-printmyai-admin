import api from "api/index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: () => {
    return api.get("/assets");
  },
  createTemplate: (file) => {
    return api.post("/assets", { url: file });
  },
  delete: (id) => {
    return api.delete(`/assets/${id}`);
  },
};
