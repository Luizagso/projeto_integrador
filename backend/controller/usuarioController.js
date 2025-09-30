const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario/modelUsuario');
const { verificarToken }  = require("../middleware/authMiddleware")

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha)
            throw { 
                    message: global.ENVIRONMENT.ERROR_REASONS_TEXT.DATA_EMPTY,
                    errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.DATA_EMPTY 
                  };

        const user = await Usuario.findOne({
            where: { email: email.toLowerCase().trim() },
            attributes: { exclude: ['senha'] }
        });

        if (user || user?.length)
            throw { 
                    message: global.ENVIRONMENT.ERROR_REASONS_TEXT.USER_DUPLICATE, 
                    errCode: global.ENVIRONMENT.ERROR_REASONS_CODE.USER_DUPLICATE 
                  }

        // Criptografar a senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        // Criar o usuário no banco de dados
        const usuario = await Usuario.create({
            nome,
            email,
            senha: hashedSenha
        });

        delete usuario.dataValues.senha;
        res.status(201).json(usuario);
    } catch (error) {
        global.UTILS.handleSequelizeError(error, res);
    }
});

// Incluir função de atualização de usuário

// Incluir função de atualização de senha do usuário

router.get('/', verificarToken, async (req, res) => {
    try {
        const userId = req.userId;
        const usuarios = await Usuario.findOne({
            where: { id: userId },
            attributes: { exclude: ['senha'] }
        });
        res.json(usuarios);
    } catch (error) {
        global.UTILS.handleSequelizeError(error, res);
    }
});

module.exports = router;
