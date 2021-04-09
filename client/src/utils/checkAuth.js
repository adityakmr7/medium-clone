import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
// For Client side authentication check
export const checkAuth = () => {
  const token = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  if (!token) {
    return false;
  }
  try {
    const { exp } = jwt.decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};
