import httpClient from "@/utils/request";

export function GetGroups(groupData) {
  return httpClient({
    method: "get",
    url: "/getgroup",
    params: {
      filterName: groupData.filterName,
      page: groupData.page,
      limit: groupData.limit,
    },
  });
}
export function GetGroup(group) {
  return httpClient({
    method: "get",
    url: "/getonegroup",
    params: {
      group: group,
    },
  });
}

export function AddGroup(groupData) {
  return httpClient({
    method: "post",
    url: "/addgroup",
    data: groupData,
  });
}

export function UpdateGroup(groupData) {
  return httpClient({
    method: "put",
    url: "/updategroup",
    data: groupData,
  });
}

export function DeleteGroup(group) {
  return httpClient({
    method: "delete",
    url: "/deletegroup",
    params: {
      group: group,
    },
  });
}
