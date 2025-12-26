const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aula',
    port: 3306
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err.message);
        return;
    }
    console.log('MySQL conectado com sucesso!');
});

module.exports = connection;
