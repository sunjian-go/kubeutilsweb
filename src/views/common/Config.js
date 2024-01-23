import Cookies from "js-cookie";

export default {
  k8sTerminalWs: "ws://"+Cookies.get("host")+":"+Cookies.get("port")+"/api/ws",
  UploadUrl: "http://"+Cookies.get("host")+":"+Cookies.get("port")+"/api/upload",
};
