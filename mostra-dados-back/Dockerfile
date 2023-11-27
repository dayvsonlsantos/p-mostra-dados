# Download Node Image
FROM node:latest

# Crie um diretório de trabalho
WORKDIR /usr/src/api

# Copie os arquivos do seu diretório local para o contêiner
COPY . .

# Copie o arquivo de ambiente
COPY ./.env.production ./.env

# Instale as dependências do Node.js
RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Execute o comando de construção do aplicativo
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Inicie o aplicativo
CMD ["npm", "run", "dev"]
