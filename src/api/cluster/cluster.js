import httpClient from "@/utils/request";

export function getAllClusters(getClusterData) {
  return httpClient({
    method: "get",
    url: "/getAllClus",
    params: getClusterData,
  });
}

export function deleteClusters(cluName) {
    return httpClient({
      method: "delete",
      url: "/delClus?clusterName="+cluName,
    });
  }
