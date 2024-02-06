FROM node:16-alpine
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

COPY .env .
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]
