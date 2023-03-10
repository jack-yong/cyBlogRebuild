# 引用镜像FROM node:latest# 作者
FROM node:alpine As development
USER root

# 执行镜像的工作目录
WORKDIR /var/publish/nestapi

COPY package.json ./
# 安装项目依赖包
RUN npm install

COPY . .

RUN npm run build

FROM node:alpine As production

WORKDIR /var/publish/nestapi

COPY package.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /var/publish/nestapi/dist ./dist

# 配置系统变量，指定端口
ENV HOST 0.0.0.0
ENV PORT 5000
# 开放端口
EXPOSE 5000
# 容器启动命令
CMD ["node","/var/publish/nestapi/dist/main.js"]