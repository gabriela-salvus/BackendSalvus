const Sequelize = require('sequelize');
const db = require('./db');

const Livros = db.define('livros', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('EM ESTOQUE', 'ALUGADO'),
        allowNull: false,
        defaultValue: 'EM ESTOQUE'
    }
});
Livros.sync();

module.exports = Livros;