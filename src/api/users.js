import api from "api/index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers: (reqQuert) => {
    const { limit = 5, skip = 0 } = reqQuert;
    const params = {};
    if (limit) params.limit = limit;
    if (skip) {
      params.skip = skip;
    } else {
      params.skip = 0;
    }
    return api.get("/users", { params });
  },
  getPaymentById: (id) => {
    return api.get(`/ecommerc/payments/list/${id}`);
  },
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  }
};
