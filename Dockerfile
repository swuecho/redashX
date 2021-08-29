# build stage
FROM node:14 as build-stage

WORKDIR /app

# RUN yarn config set registry https://mirrors.huaweicloud.com/repository/npm/
# RUN yarn config set registry https://registry.npm.taobao.org
# RUN yarn config set "chromedriver_cdnurl" "https://registry.npm.taobao.org/chromedriver"

# clean versions without the storybook dependency
COPY package.json ./ 
COPY yarn.lock  ./ 


# where the ENV is used?
ENV SR_ADMIN_PRODUCTION true 

RUN yarn install

COPY . .

# RUN yarn test:unit
RUN yarn build

# COPY static ./dist/static

# production stage
FROM nginx:alpine as production-stage

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
RUN mkdir  react
COPY --from=build-stage /app/build ./react

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker run -it -p 9092:80 --rm --name sradmin_prod echowuhao/sradmin
