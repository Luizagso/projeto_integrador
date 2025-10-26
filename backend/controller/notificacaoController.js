const express = require("express");
const sequelize = require("../database/database");
const Notificacao = require("../model/notificacao/modelNotificacao");

const router = express.Router();

/**
 * LISTAR TODAS AS NOTIFICAÇÕES DO USUÁRIO
 */
router.get("/all", async (req, res) => {
  try {
    const userId = req.userId;

    const notificacoes = await Notificacao.findAll({
      where: { idUsuario: userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(notificacoes);
  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
});

/**
 * MARCAR NOTIFICAÇÃO COMO LIDA
 */
router.patch("/:id/lida", async (req, res) => {
  let transaction;
  try {
    const userId = req.userId;
    const notificacaoId = req.params.id;

    transaction = await sequelize.transaction();

    const notificacao = await Notificacao.findOne({
      where: { id: notificacaoId, idUsuario: userId },
    });

    if (!notificacao) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Notificação não encontrada.",
        errCode: "NOTIFICACAO_NOT_FOUND",
      });
    }

    await notificacao.update({ lida: true }, { transaction });
    await transaction.commit();

    res.status(200).json("OK");
  } catch (error) {
    if (transaction) await transaction.rollback();
    global.UTILS.handleSequelizeError(error, res);
  }
});

module.exports = router;
