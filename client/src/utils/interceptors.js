import axios from "axios";
import jwtDecode from "jwt-decode";

export function axiosInterceptor(user, token, refreshToken, dispatch) {
  const interceptor = axios.create();
  interceptor.interceptors.request.use(async (config) => {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      const res = await axios.post("/api/auth/refresh", {
        token: refreshToken,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          user: user,
        },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      config.headers["authorization"] = `Bearer ${res.data.token}`;
    }

    return config;
  });
  return interceptor;
}
