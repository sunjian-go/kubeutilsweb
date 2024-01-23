import httpClient from "@/utils/request";
export function getNodesReq(clusterName) {
    return httpClient({
      method: "get",
      url: "/corev1/getnodes?clusterName="+clusterName,
    });
  }