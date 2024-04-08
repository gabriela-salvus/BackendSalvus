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
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1 // Valor padrão para o em estoque
    }
});
Livros.sync; 

module.exports = Livros;