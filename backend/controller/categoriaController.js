const express = require("express");
const Categoria = require("../model/categoria/modelCategoria");
const sequelize = require("../database/database");
const { enviarNotificacao } = require("../rabbitmq/producer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado

    const categoriaData = { ...req.body, idUsuario: userId };
    const categoria = await Categoria.create(categoriaData);

    await enviarNotificacao({
      idUsuario: userId,
      titulo: "Nova categoria criada",
      mensagem: `Categoria ${categoriaData.nome} criada com sucesso.`,
      tipo: global.ENVIRONMENT.NOTIFICATION_TYPES.SUCESS
    });

    res.status(201).json(categoria);
  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.put("/:id", async (req, res) => {
  let transaction;
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const categoriaId = req.params.id;
    const categoriaData = { ...req.body, id: categoriaId };

    // Iniciar uma transação
    transaction = await sequelize.transaction();

    // Atualizar os dados da categoria
    await Categoria.update(categoriaData, {
      where: { id: categoriaId, idUsuario: userId },
      transaction,
    });

    // Commit da transação se tudo ocorrer bem
    await transaction.commit();

    await enviarNotificacao({
      idUsuario: userId,
      titulo: "Categoria editada",
      mensagem: `Nome da categoria alterado para ${categoriaData.nome}.`,
      tipo: global.ENVIRONMENT.NOTIFICATION_TYPES.SUCESS
    });

    res.status(201).json(categoriaData);
  } catch (error) {
    console.error(error);
    // Rollback da transação em caso de erro
    if (transaction) {
      await transaction.rollback();
    }
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.get("/all", async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado

    const categorias = await Categoria.findAll({
      where: { idUsuario: userId },
    });
    res.json(categorias);
  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    const categoriaId = req.params.id;

    await Categoria.destroy({ where: { id: categoriaId, idUsuario: userId } });

    await enviarNotificacao({
      idUsuario: userId,
      titulo: "Categoria deletada",
      mensagem: `A categoria de ID ${categoriaId} foi deletada.`,
      tipo: global.ENVIRONMENT.NOTIFICATION_TYPES.SUCESS
    });

    res.status(200).json("OK");
  } catch (error) {
    global.UTILS.handleSequelizeError(error, res);
  }
});

module.exports = router;
