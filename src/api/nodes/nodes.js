import httpClient from "@/utils/request";
export function getNodesReq(clusterName,filter_name,limit,page) {
    return httpClient({
      method: "get",
      url: "/corev1/getnodes?clusterName="+clusterName+"&filter_name="+filter_name+"&limit="+limit+"&page="+page,
    });
  }

  export function getNodeDetailsReq(clusterName,nodeName) {
    return httpClient({
      method: "get",
      url: "/corev1/getnodedetail",
      params: {
        clusterName:clusterName,
        nodeName:nodeName
      },
    });
  }