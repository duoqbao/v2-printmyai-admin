import api from "./index.js";

export default {
  getList: () => {
    return api.get("/category-styles");
  },
  create: (body) => {
    return api.post("/category-styles", body);
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
};
