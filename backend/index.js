// app.js
const http = require('http');

// Configuração usando variáveis de ambiente
const hostname = process.env.HOST_DATABASE || '127.0.0.1';
const port = process.env.PORT_NODE || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá Mundo!\n');
});

server.listen(port, hostname, () => {
  console.log(`Servidor a rodar em http://${hostname}:${port}/`);
});