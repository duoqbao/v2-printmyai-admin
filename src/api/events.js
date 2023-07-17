import api from "api/index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getEvents: () => {
    return api.get(`/ecommerc/event`);
  },
  update: (body) => {
    return api.put(`/ecommerc/event`, body);
  },
  getStores: () => {
    return api.get(`/ecommerc/event/get-stores`);
  },
  updateStore: (id) => {
    return api.put(`/ecommerc/event/set-shop?shopId=${id}`);
  },
};
