const { initRabbitMQ, getChannel } = require("./connection");
const FILA = "notificacoes";

async function enviarNotificacao(notificacao) {
  try {
    // Garante que o canal está inicializado
    let channel = getChannel();
    if (!channel) {
      channel = await initRabbitMQ();
    }

    await channel.assertQueue(FILA, { durable: true });

    channel.sendToQueue(FILA, Buffer.from(JSON.stringify(notificacao)), {
      persistent: true,
    });

    console.log(`[Producer] Notificação enviada para fila "${FILA}": ${notificacao.titulo}`);
  } catch (error) {
    console.error("[Producer] Erro ao enviar notificação:", error);
  }
}

module.exports = { enviarNotificacao };
