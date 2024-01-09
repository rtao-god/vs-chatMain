FROM node:18-alpine3.17
WORKDIR /dist
COPY . .
RUN apk add git
RUN rm package-lock.json
RUN npm i
RUN npm run build
CMD npm run start
EXPOSE 3000 