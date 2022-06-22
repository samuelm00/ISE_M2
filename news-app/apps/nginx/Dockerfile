FROM nginx:1.21

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/

COPY ise.key /etc/nginx/
COPY ise.crt /etc/nginx/
