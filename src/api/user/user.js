import httpClient from "@/utils/request";

export function login(userData) {
  return httpClient({
    method: "post",
    url: "/login",
    data: userData,
  });
}
export function authCode() {
  return httpClient({
    method: "get",
    url: "/authformula",
  });
}
