import httpClient from "@/utils/request";

export function GetRoles(roleData) {
  return httpClient({
    method: "get",
    url: "/getrole",
    params: {
      filterName: roleData.filterName,
      page: roleData.page,
      limit: roleData.limit,
    },
  });
}
export function GetRole(role) {
    return httpClient({
      method: "get",
      url: "/getonerole",
      params: {
       role: role
      },
    });
  }

export function AddRole(roleData) {
  return httpClient({
    method: "post",
    url: "/addrole",
    data: roleData,
  });
}

export function UpdateRole(roleData) {
  return httpClient({
    method: "put",
    url: "/updaterole",
    data: roleData,
  });
}

export function DeleteRole(role) {
  return httpClient({
    method: "delete",
    url: "/deleterole",
    params: {
      role: role,
    },
  });
}
