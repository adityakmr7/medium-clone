import { Auth } from "../../constants/Constants";

const initialState = {
  isAuthenticated: false,
  token: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Auth.USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case Auth.USER_LOGGED_OUT:
      return {
        isAuthenticated: false,
        token: "",
      };

    default:
      return { ...state };
  }
};

export default authReducer;
