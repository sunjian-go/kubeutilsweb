import httpClient from "@/utils/request";
export function getNamespacesReq(clusterName) {
    return httpClient({
      method: "get",
      url: "/corev1/getnamespaces?clusterName="+clusterName,
    });
  }