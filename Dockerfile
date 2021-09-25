# build stage
FROM node:14 as build-stage

WORKDIR /app

# clean versions without the storybook dependency
COPY package.json ./ 
COPY yarn.lock  ./ 

RUN yarn install

COPY . .

# run test
RUN yarn test --watchAll=false
RUN yarn build

# production stage
FROM nginx:alpine as production-stage

RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

COPY --from=build-stage /app/build /var/www/html/react

# make all files belong to the nginx user
#RUN chown -R nginx:nginx /var/www/html 
RUN chmod -R 777 /var/www/html

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

