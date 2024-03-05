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


export function GetUsers(userData) {
  return httpClient({
    method: "get",
    url: "/getuser",
    params: {
      filterName: userData.filterName,
      page: userData.page,
      limit: userData.limit,
    },
  });
}
export function GetUser(user) {
  return httpClient({
    method: "get",
    url: "/getoneuser",
    params: {
      user: user,
    },
  });
}

export function AddUser(userData) {
  return httpClient({
    method: "post",
    url: "/adduser",
    data: userData,
  });
}

export function UpdateUser(userData) {
  return httpClient({
    method: "put",
    url: "/updateuser",
    data: userData,
  });
}

export function DeleteUser(user) {
  return httpClient({
    method: "delete",
    url: "/deleteuser",
    params: {
      user: user,
    },
  });
}
