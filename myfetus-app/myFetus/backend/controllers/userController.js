const client = require('../backend');
const updateEntity = require('../utils/updateEntity');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 * Criar novo usuário
 */
const createUser = async (req, res) => {
  const { name, email, password, birthdate = null, is_active = true, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Nome, e-mail e senha são obrigatórios.'
    });
  }

  try {
    // Verifica se já existe usuário com o mesmo e-mail
    const exists = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'E-mail já cadastrado.'
      });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insere novo usuário
    const result = await client.query(
      `INSERT INTO users (name, email, password, birthdate, is_active, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, birthdate, is_active, role`,
      [name, email, hashedPassword, birthdate, is_active, role]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso.',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro interno ao criar usuário.'
    });
  }
};

/**
 * Listar todos os usuários
 */
const getUsers = async (req, res) => {
  try {
    const result = await client.query(
      'SELECT id, name, email, birthdate, is_active, role FROM users ORDER BY id ASC'
    );
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error('❌ Erro ao listar usuários:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar usuários.'
    });
  }
};

/**
 * Buscar usuário por ID
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'SELECT id, name, email, birthdate, is_active, role FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado.'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Erro ao buscar usuário:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar usuário.'
    });
  }
};

/**
 * Atualizar usuário
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...rest } = req.body;
  const updateData = { ...rest };

  try {
    if (password) {
      updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedUser = await updateEntity('users', id, updateData);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado.'
      });
    }

    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: 'Usuário atualizado com sucesso.',
      data: updatedUser
    });
  } catch (err) {
    console.error('❌ Erro ao atualizar usuário:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar usuário.'
    });
  }
};

/**
 * Deletar usuário
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso.'
    });
  } catch (err) {
    console.error('❌ Erro ao deletar usuário:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro ao deletar usuário.'
    });
  }
};

/**
 * Login do usuário
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email e senha são obrigatórios.'
    });
  }

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não encontrado.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Senha incorreta.'
      });
    }

    // Remove a senha da resposta
    const { password: _, ...safeUser } = user;

    res.status(200).json({
      success: true,
      message: 'Login bem-sucedido.',
      data: safeUser
    });
  } catch (err) {
    console.error('❌ Erro ao realizar login:', err.message);
    res.status(500).json({
      success: false,
      error: 'Erro interno no login.'
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};
