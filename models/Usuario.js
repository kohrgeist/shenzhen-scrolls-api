const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('GUEST', 'LEITOR_FREE', 'MESTRE_AUTOR', 'ANCIAO_ADMIN'),
        defaultValue: 'GUEST'
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

module.exports = Usuario;