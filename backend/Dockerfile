FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de ambiente
COPY .env.docker .env
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar o restante dos arquivos da aplicação
COPY . .

# Expõe a porta definida na variável de ambiente
EXPOSE $PORT_NODE

# Comando para iniciar a aplicação
CMD ["node", "index.js"]