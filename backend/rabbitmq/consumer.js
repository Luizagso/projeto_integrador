const { initRabbitMQ, getChannel } = require("./connection");
const Notificacao = require("../model/notificacao/modelNotificacao");
const FILA = "notificacoes";

async function startNotificacaoConsumer() {

  // Garante que o canal está inicializado
  let channel = getChannel();
  if (!channel) {
    channel = await initRabbitMQ();
  }

  await channel.assertQueue(FILA, { durable: true });
  console.log(`[Consumer] Aguardando mensagens na fila "${FILA}"...`);

  channel.consume(
    FILA,
    async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        await Notificacao.create({
          idUsuario: data.idUsuario,
          titulo: data.titulo,
          mensagem: data.mensagem,
          tipo: data.tipo,
        });

        console.log(`[Consumer] Notificação salva no banco: ${data.titulo}`);
        channel.ack(msg);
      } catch (error) {
        console.error("[Consumer] Erro ao processar notificação:", error);
        channel.nack(msg, false, false); // descarta a mensagem com erro
      }
    }
  );
}

startNotificacaoConsumer();
