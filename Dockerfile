FROM node:20-alpine AS build
WORKDIR /app
COPY . .

RUN apk add fish

ARG VUE_APP_SERVER_IP
ARG VUE_APP_SERVER_PORT
ARG VUE_APP_SERVER_PATH
ARG VUE_APP_PUBLIC_PATH


ENV VUE_APP_SERVER_IP=$VUE_APP_SERVER_IP
ENV VUE_APP_SERVER_PORT=$VUE_APP_SERVER_PORT
ENV VUE_APP_SERVER_PATH=$VUE_APP_SERVER_PATH
ENV VUE_APP_PUBLIC_PATH=$VUE_APP_PUBLIC_PATH


RUN npm run build

# ---------- nginx ----------
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vue unter /fitness
RUN mkdir -p /usr/share/nginx/html/fitness
COPY --from=build /app/dist/ /usr/share/nginx/html/fitness/

