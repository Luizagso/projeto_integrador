# Usar Node.js 20 LTS como base para compatibilidade
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json primeiro para otimizar cache do Docker
COPY package*.json ./

# Instalar dependências (atualmente não há dependências externas, mas preparado para futuro)
RUN npm install

# Copiar o código fonte
COPY . .

# Expor a porta que o backend usa
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "index.js"]