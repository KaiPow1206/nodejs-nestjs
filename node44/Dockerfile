# cài môi trường node
FROM node:20

# tạo folder chưa soure code
WORKDIR /home/app

# coppy file package.json và package-lock.json vào docker
COPY package*.json ./

# cài lib trong file package.json
RUN npm install

# copy prisma từ local sang docker
# vừa copy từ local vừa tạo folder mới có tên là prisma trong docker
COPY prisma ./prisma/

# tạo prisma client
RUN npx prisma generate

# copy toàn bộ source code vào docker
COPY . .

# expose port
EXPOSE 8080

# chạy source backend
CMD [ "npm","run","start" ]