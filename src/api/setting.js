import api from "api/index";
export default {
  get3dServices: () => {
    return api.get("/3d-services");
  },
  update3dServices: (sku, secretKey) => {
    return api.put(`/3d-services/${sku}`, { secretKey });
  },
  getListTunes: () => {
    return api.get(`/3d-services/astria-tunes`);
  },
  updateAstriaConfig: ({ base_tune_id, branch }) => {
    return api.post(`/3d-services/astria-config`, { base_tune_id, branch });
  },
};
