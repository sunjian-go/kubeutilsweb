import httpClient from "@/utils/request";

export function getPodsReq(getPodsData, clusterName) {
  return httpClient({
    method: "get",
    url: "/corev1/getpods?clusterName=" + clusterName,
    params: getPodsData,
  });
}
export function updatePodsReq(updatePodsData) {
  return httpClient({
    method: "put",
    url: "/corev1/updatepod",
    data: updatePodsData,
  });
}
export function getPodsDetailReq(getPodDetailData) {
  return httpClient({
    method: "get",
    url: "/corev1/podetail",
    params: getPodDetailData,
  });
}
export function deletePodReq(deletePodData) {
  return httpClient({
    method: "delete",
    url: "/corev1/deletepod",
    params: deletePodData,
  });
}
export function getContainersReq(getContainerData, clusterName) {
  return httpClient({
    method: "get",
    url: "/corev1/getcontainers?clusterName=" + clusterName,
    params: getContainerData,
  });
}
export function getLogReq(getLogData) {
  return httpClient({
    method: "get",
    url: "/corev1/getlog",
    params: getLogData,
  });
}
export function getContainerPath(getContainerPathData, clusterName) {
  return httpClient({
    method: "get",
    url: "/listPath?clusterName=" + clusterName,
    params: getContainerPathData,
  });
}
export function downloadFile(downloadFileData, clusterName) {
  return httpClient({
    method: "post",
    url: "/download?clusterName=" + clusterName,
    responseType: "blob", // 重要，因为我们期望的是一个二进制文件
    data: downloadFileData,
    timeout: 300000,
  });
}
export function getUploadHistory(getUploadHistoryData) {
  return httpClient({
    method: "get",
    url: "/uploadHistory",
    params: getUploadHistoryData,
  });
}

