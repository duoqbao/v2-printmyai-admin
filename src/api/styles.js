import api from "./index.js";

export default {
  getList: () => {
    return api.get("/category-styles");
  },
  sort: (previous) => {
    return api.post("/category-styles/sort", { previous });
  },
  create: (body) => {
    return api.post("/category-styles", body);
  },
  deletCategoryById: (id) => {
    return api.delete(`/category-styles/${id}`);
  },
  updateCategoryById: (id, body) => {
    return api.put(`/category-styles/${id}`, body);
  },
  update: (id, body) => {
    return api.put(`/styles/update/${id}`, body);
  },
  delete: (id) => {
    return api.delete(`/styles/delete/${id}`);
  },
  getStyleByCategoryId: (categoryId) => {
    return api.get(`/styles/${categoryId}`);
  },
  createStyleByCategoryId: (categoryId, body) => {
    return api.post(`/styles/${categoryId}`, body);
  },
  getOptions: () => {
    return api.get(`/styles/config-options`);
  },
};
