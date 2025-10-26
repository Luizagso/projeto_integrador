const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = 'notificacoes';

let connection = null;
let channel = null;

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

async function connectWithRetry(retryCount = 0) {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('[Connection] Conexão com RabbitMQ estabelecida!');

    // Fecha conexão quando o Node.js terminar
    process.on('exit', async () => {
      if (channel) await channel.close();
      if (connection) await connection.close();
    });

    return channel;
  } catch (err) {
    console.error(`[Connection] Erro ao conectar RabbitMQ: ${err.message}`);

    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount); // backoff exponencial
      console.log(`[Connection] Tentando reconectar em ${delay}ms... (tentativa ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectWithRetry(retryCount + 1);
    } else {
      console.error('[Connection] Número máximo de tentativas atingido. Não foi possível conectar ao RabbitMQ.');
      throw err;
    }
  }
}

async function initRabbitMQ() {
  if (connection && channel) return channel;
  return connectWithRetry();
}

module.exports = {
  initRabbitMQ,
  getChannel: () => channel,
};
