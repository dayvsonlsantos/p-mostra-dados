# Download Node Image
FROM node:20.9.0

# Crie um diretório de trabalho
WORKDIR /usr/src/app

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli@latest

# Copie apenas o package.json e package-lock.json primeiro para aproveitar o cache de camadas
COPY package*.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie os arquivos restantes do seu diretório local para o contêiner
COPY . .

# Exponha a porta 4000
EXPOSE 4200

# Inicie o aplicativo
CMD ["ng", "serve", "--host", "0.0.0.0"]
