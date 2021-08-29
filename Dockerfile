# build stage
FROM node:14 as build-stage

WORKDIR /app

# RUN yarn config set registry https://mirrors.huaweicloud.com/repository/npm/
# RUN yarn config set registry https://registry.npm.taobao.org
# RUN yarn config set "chromedriver_cdnurl" "https://registry.npm.taobao.org/chromedriver"

# clean versions without the storybook dependency
COPY package.json ./ 
COPY yarn.lock  ./ 

## fable
#RUN yarn --cwd third_party/fs_lib install
#RUN yarn --cwd third_party/fs_lib build
# RUN yarn --cwd third_party/fs_lib/bs_widget test

RUN yarn install

COPY . .
# where the ENV is used?
ENV SR_ADMIN_PRODUCTION true 


# RUN yarn test:unit
RUN yarn build

# COPY static ./dist/static

# production stage
FROM nginx:1.15.8-alpine as production-stage

RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

COPY --from=build-stage /app/build /var/www/html

# make all files belong to the nginx user
#RUN chown -R nginx:nginx /var/www/html 
RUN chmod -R 777 /var/www/html

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker run -it -p 9092:80 --rm --name sradmin_prod echowuhao/sradmin
