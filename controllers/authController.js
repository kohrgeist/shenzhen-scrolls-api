const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha, role } = req.body;
        // Criptografa a senha antes de salvar
        const hash = await bcrypt.hash(senha, 10);
        const user = await Usuario.create({ nome, email, senha: hash, role });
        
        res.status(201).json({ message: 'Novo Cultivador registrado com sucesso', id: user.id });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ erro: 'Credenciais inválidas. O caminho marcial está fechado.' });
        }
        
        // Gera o token carregando o ID e a Role (Crucial para o OPA depois)
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET || 'shenzhen_secret_key',
            { expiresIn: '1d' }
        );
        
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};