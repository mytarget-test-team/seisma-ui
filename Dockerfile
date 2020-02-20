FROM node:6.3.1 as build

COPY . /usr/local/src/seisma-ui
WORKDIR /usr/local/src/seisma-ui
RUN npm install && npm run build


FROM nginx:1.16.1

COPY --from=build /usr/local/src/seisma-ui /usr/local/src/seisma-ui

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
