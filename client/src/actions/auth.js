import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";
import AuthService from "../services/auth.service";


export const apiLogin = (email, password) => (dispatch) => {
    return AuthService.login(email, password)
        .then((data) => {
            if (data.token) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: data },
                });
            }
            else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: { user: data },
                });
            }
        })
        .catch((err) => {
            console.log(err)
        })
};

export const apiLogout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};