import api from "./index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getlist: () => {
    return api.get("/ecommerc/categories");
  },
  create: (body) => {
    return api.post("/ecommerc/categories", body);
  },
  update: (id, body) => {
    return api.put(`/ecommerc/categories/${id}`, body);
  },
  delete: (id) => {
    return api.delete(`/ecommerc/categories/${id}`);
  },
  deleteForce: (id) => {
    return api.delete(`ecommerc/categories/${id}/delete-force`);
  },
};
