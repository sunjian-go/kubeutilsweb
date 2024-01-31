import httpClient from "@/utils/request";

export function getInterface(clusterName, url) {
  return httpClient({
    method: "get",
    url: "/interfaces?clusterName=" + clusterName + "&url=" + url,
  });
}

export function startPacket(clusterName, url, packetData) {
  return httpClient({
    method: "post",
    url: "/startPacket",
    params: {
      clusterName: clusterName,
      url: url,
    },
    data: packetData,
  });
}

export function stopPacket(clusterName, url) {
  return httpClient({
    method: "post",
    url: "/stopPacket",
    params: {
      clusterName: clusterName,
      url: url,
    },
    responseType: "blob", // 重要，因为我们期望的是一个二进制文件
    timeout: 300000,
  });
}

export function icmpFunc(clusterName,url, icmpData) {
  return httpClient({
    method: "post",
    url: "/icmp",
    params: {
      clusterName: clusterName,
      url: url,
    },
    data: icmpData,
  });
}

export function portFunc(clusterName,url, portData) {
    return httpClient({
      method: "post",
      url: "/port",
      params: {
        clusterName: clusterName,
        url: url,
      },
      data: portData,
    });
  }
