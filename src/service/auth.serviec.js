import api from "api/index"
export const login = async  (values) => {
    return api.post('/auth/login',values)
}