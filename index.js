const express = require('express');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Obra = require('./models/Obra');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Rotas da API
app.use('/api/auth', authRoutes);

// Rota de teste rápida para provar que a API responde
app.get('/api/health', (req, res) => {
    res.json({ status: 'Shenzhen Scrolls API Online', cultivadores: 'Ativos' });
});

// Sincronização do Banco e Start do Servidor
sequelize.sync({ alter: true })
    .then(() => {
        console.log('📖 Banco de dados sincronizado com sucesso!');
        app.listen(3000, () => {
            console.log('🐉 Servidor rodando na porta 3000');
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco:', err));