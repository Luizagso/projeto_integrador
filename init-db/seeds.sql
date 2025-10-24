USE bd_projeto_integrador;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM categoriatransacao;
DELETE FROM transacao;
DELETE FROM categoria;
DELETE FROM usuario;
SET SQL_SAFE_UPDATES = 1;

-- Inserir usuário padrão -- senha 123456
INSERT INTO usuario (id, nome, email, senha, limite, createdAt, updatedAt) 
VALUES (
  2000,
  'Usuário Padrão', 
  'usuario@exemplo.com', 
  '$2b$10$XD43tWKSoiEiHcYme6WCweblEd.mtzLJBhWeJ.u0yX5ZGDrED6LuO', 
  5000.00, 
  NOW(), 
  NOW()
);

-- Inserir categorias
INSERT INTO categoria (id, idUsuario, nome, createdAt, updatedAt) 
VALUES 
  (1, 2000, 'Alimentação', NOW(), NOW()),
  (2, 2000, 'Transporte', NOW(), NOW()),
  (3, 2000, 'Moradia', NOW(), NOW()),
  (4, 2000, 'Lazer', NOW(), NOW()),
  (5, 2000, 'Saúde', NOW(), NOW()),
  (6, 2000, 'Educação', NOW(), NOW()),
  (7, 2000, 'Vestuário', NOW(), NOW()),
  (8, 2000, 'Salário', NOW(), NOW());

-- Inserir transações (outubro + outros meses)
INSERT INTO transacao (id, idUsuario, descricao, data, valor, tipo, createdAt, updatedAt) 
VALUES 
  -- Outubro (originais)
  (1, 2000, 'Compra de mantimentos no supermercado', '2025-10-20 10:30:00', 250.75, 1, NOW(), NOW()),
  (2, 2000, 'Pagamento de aluguel', '2025-10-05 09:00:00', 1200.00, 1, NOW(), NOW()),
  (3, 2000, 'Combustível para carro', '2025-10-18 14:20:00', 150.00, 1, NOW(), NOW()),
  (4, 2000, 'Cinema com a família', '2025-10-15 19:00:00', 80.00, 1, NOW(), NOW()),
  (5, 2000, 'Consulta médica', '2025-10-10 11:00:00', 200.00, 1, NOW(), NOW()),
  (6, 2000, 'Curso online de programação', '2025-10-08 16:45:00', 350.00, 1, NOW(), NOW()),
  (7, 2000, 'Compra de roupas', '2025-10-12 15:30:00', 180.50, 1, NOW(), NOW()),
  (8, 2000, 'Salário mensal', '2025-10-01 08:00:00', 4500.00, 2, NOW(), NOW()),
  (9, 2000, 'Freelance desenvolvimento web', '2025-10-22 17:00:00', 1200.00, 2, NOW(), NOW()),

  -- Setembro
  (10, 2000, 'Jantar em restaurante', '2025-09-14 20:00:00', 95.00, 1, NOW(), NOW()),
  (11, 2000, 'Salário mensal', '2025-09-01 08:00:00', 4500.00, 2, NOW(), NOW()),

  -- Agosto
  (12, 2000, 'Mensalidade academia', '2025-08-03 09:00:00', 120.00, 1, NOW(), NOW()),
  (13, 2000, 'Supermercado do mês', '2025-08-19 12:00:00', 300.00, 1, NOW(), NOW()),

  -- Julho
  (14, 2000, 'Pagamento de aluguel', '2025-07-05 09:00:00', 1200.00, 1, NOW(), NOW()),
  (15, 2000, 'Salário mensal', '2025-07-01 08:00:00', 4500.00, 2, NOW(), NOW());

-- Inserir relacionamentos
INSERT INTO categoriatransacao (idCategoria, idTransacao, valor, createdAt, updatedAt) 
VALUES 
  (1, 1, 250.75, NOW(), NOW()),
  (3, 2, 1200.00, NOW(), NOW()),
  (2, 3, 150.00, NOW(), NOW()),
  (4, 4, 80.00, NOW(), NOW()),
  (5, 5, 200.00, NOW(), NOW()),
  (6, 6, 350.00, NOW(), NOW()),
  (7, 7, 180.50, NOW(), NOW()),
  (8, 8, 4500.00, NOW(), NOW()),
  (8, 9, 1200.00, NOW(), NOW()),
  (1, 10, 95.00, NOW(), NOW()),
  (8, 11, 4500.00, NOW(), NOW()),
  (5, 12, 120.00, NOW(), NOW()),
  (1, 13, 300.00, NOW(), NOW()),
  (3, 14, 1200.00, NOW(), NOW()),
  (8, 15, 4500.00, NOW(), NOW());

COMMIT;
