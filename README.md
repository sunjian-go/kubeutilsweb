# 多集群页面操作pod工具前端
支持页面上传文件到pod内部，从pod内部下载文件到本地，终端、日志功能。支持多集群

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Dockerfile
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
