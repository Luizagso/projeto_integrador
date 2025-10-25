const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = 'transactions';

let connection = null;
let channel = null;

// Inicializa a conexão e o canal uma vez
async function initRabbitMQ() {
  if (connection && channel) return channel;

  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('Conexão com RabbitMQ estabelecida!');

    // Fecha conexão quando o Node.js terminar
    process.on('exit', async () => {
      if (channel) await channel.close();
      if (connection) await connection.close();
    });

    return channel;
  } catch (err) {
    console.error('Erro ao conectar RabbitMQ:', err);
    throw err;
  }
}

module.exports = {
  initRabbitMQ,
  getChannel: () => channel,
};