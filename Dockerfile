FROM node:20

WORKDIR /app

ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "run", "serve"]
