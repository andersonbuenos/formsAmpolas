# Etapa 1: Construir a aplicação Angular
FROM node:21 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/login-page/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]