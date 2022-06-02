FROM harbor.comm100dev.io/comm100-internal/nginx

ADD server.conf /etc/nginx/conf.d/

COPY dist  /dist

RUN rm -rf /etc/nginx/conf.d/default.conf
