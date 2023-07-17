import api from "./index";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: (id) => {
    return api.get(`/ecommerc/products/${id}/`);
  },
  creted: (id, body) => {
    return api.post(`/ecommerc/products/${id}`, body);
  },
  getAllBlueprint: () => {
    return api.get("ecommerc/products/blueprints");
  },
  update: (id, body) => {
    return api.put(`/ecommerc/products/${id}/detail`, body);
  },
  delete: (id) => {
    return api.delete(`/ecommerc/products/${id}/detail`);
  },
  getPrintProvider: (id) => {
    return api.get(`/ecommerc/products/${id}/print-providers`);
  },
  getVariantsByProvider: (productId, printProviderId) => {
    return api.get(
      `/ecommerc/products/${productId}/print-providers/${printProviderId}/variants`
    );
  },
  getProductBySales: () => {
    return api.get(`/ecommerc/products/on-sale`);
  },
  toggleSale: (priceSale, id) => {
    return api.put(`/ecommerc/products/${id}/sale`, { salePrice: priceSale });
  },
};
