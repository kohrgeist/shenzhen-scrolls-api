const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Obra = sequelize.define('Obra', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sinopse: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'obras',
    timestamps: true
});

// Relacionamento (1 Autor tem N Obras)
Usuario.hasMany(Obra, { foreignKey: 'autor_id' });
Obra.belongsTo(Usuario, { foreignKey: 'autor_id' });

module.exports = Obra;