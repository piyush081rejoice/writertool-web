import { Cookies } from "react-cookie-consent";
export const isBrowser = () => typeof window !== "undefined";
export const getCookie = (key) => {
  if (isBrowser()) {
    return Cookies.get(key);
  }
};

export const setCookie = (key, value, options) => {
  Cookies.set(key, value, options);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const getCookieFromRequest = async (req, cookieName) => {
  const cookie = await req.headers.cookie?.split(";").find((cookie) => cookie.trim().startsWith(`${cookieName}=`));
  if (!cookie) return null;
  return cookie.split("=")[1];
};