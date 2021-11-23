export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOADED_USER":
      return {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isFetching: false,
        err: false,
      };
    case "LOGIN_START":
      return {
        token: null,
        refreshToken: null,
        user: null,
        isFetching: true,
        err: false,
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isFetching: false,
        err: false,
      };
    case "LOGIN_FAILURE":
      return {
        token: null,
        refreshToken: null,
        user: null,
        isFetching: false,
        err: true,
      };
    case "LOGOUT":
      return {
        token: null,
        refreshToken: null,
        user: null,
        isFetching: false,
        err: false,
      };
    default:
      break;
  }
};
