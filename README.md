# k8s实用性效率工具前端
支持页面上传文件到pod内部，从pod内部下载文件到本地，终端、日志功能。支持多集群

# 说明
此项目是一个可以在页面对pod以及node进行远程操作的平台前端

# 功能
pod: 页面上传文件到pod内部，从pod内部下载文件到本地，终端、日志功能。

node: 远程抓包、icmp测试、端口测试（仅支持TCP），先决条件：需配合kubepacket插件完成

支持添加多个集群

## 下载到本地安装依赖包
```
npm install
```

## 本地运行测试
```
npm run serve
```

## 打包
```
npm run build
```

# Dockerfile
#kubeagent.yaml在项目根目录
```
FROM nginx
COPY dist /usr/share/nginx/html/dist
RUN mkdir /usr/share/nginx/html/dist/yaml
COPY kubeagent.yaml /usr/share/nginx/html/dist/yaml/
EXPOSE 8080
```

# 部署
## docker部署
```
docker run --name kubeutilsweb -d -p 8888:8080 -v conf/default.conf:/etc/nginx/conf.d/default.conf kubeutilsweb:v1.0
```

## k8s部署
```
基于docker部署进行修改
```

# nginx配置文件

```
#default.conf
server {
    listen       8080;
    server_name  localhost;
    location / {
        root   /usr/share/nginx/html/dist;
        try_files $uri $uri/ /index.html;
        #index  index.html index.htm;
    }
    location /api {
       proxy_pass http://1.1.1.1:8999;   #后端
   }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

# 页面效果展示


