FROM mhart/alpine-node:8.9.4

ADD .staging/*.tar.gz /tmp/

ENV PORT 8080

RUN  \
&&  groupadd -S -g 499 fp \
&&  useradd -S -D -G fp -u 499 fp \
&&  mkdir -p /opt/fp \
&&  tar -xzvf /tmp/*.tar.gz -C /opt/fp/ --strip-components=1 \
&&  cd /opt/fp/programs/server \
&&  npm install --production \
&&  chown -R fp:fp /opt/fp

EXPOSE 8080

USER fp

ENTRYPOINT ["node", "main.js"]