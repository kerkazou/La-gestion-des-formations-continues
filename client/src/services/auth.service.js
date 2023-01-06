import axios from "axios";

const API_URL = "http://localhost:1111/api/auth/";

const login = (email, password) => {
    return axios.post(API_URL + "login", { email, password })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }
            return res.data;
        });
};

const logout = () => {
    return axios.get(API_URL + "logout")
        .then(() => {
            localStorage.removeItem("user");
        });
};

export default {
    login,
    logout,
};