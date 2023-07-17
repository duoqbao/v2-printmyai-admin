import api from "./index";

export default {
  getList: () => api.get("/ecommerc/coupons"),
  remove: (id) => api.delete(`/ecommerc/coupons/${id}`),
  create: (body) => api.post(`/ecommerc/coupons`, body),
};
