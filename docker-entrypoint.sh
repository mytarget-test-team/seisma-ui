#!/usr/bin/env bash

set -ex

API_HOST=${API_HOST:="seisma-backend:5000"}

WORKER_PROCESSES=${WORKER_PROCESSES:="1"}
WORKER_CONNECTIONS=${WORKER_CONNECTIONS:="1024"}

cat <<< "
user  nginx;
worker_processes ${WORKER_PROCESSES};

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections ${WORKER_CONNECTIONS};
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                      '\$status \$body_bytes_sent "\$http_referer" '
                      '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    reset_timedout_connection on;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
" > /etc/nginx/nginx.conf

cat <<< "
server {
    listen 8080;
    expires off;
    sendfile on;

    location / {
        root /usr/local/src/seisma-ui;
        try_files \$uri /index.html;
    }

    location ~* \.(js|css|jpeg|jpg|png|gif)$ {
        root /usr/local/src/seisma-ui;
    }

    location /api/ {
        ssi on;

        include uwsgi_params;
        uwsgi_param HTTPS off;

        uwsgi_pass ${API_HOST};

        uwsgi_buffer_size 64k;
        uwsgi_buffers 32 4k;
        uwsgi_busy_buffers_size 64k;
        uwsgi_intercept_errors on;
        uwsgi_read_timeout 1800;
    }
}
" > /etc/nginx/conf.d/api.conf

nginx -g "daemon off;"
