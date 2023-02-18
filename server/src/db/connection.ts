import mysql, { Connection } from 'mysql';

const connection: Connection = mysql.createConnection({
    host: 'localhost',
    database: 'taskfuel',
    user: 'root',
    password: '',
});

connection.connect((err: mysql.MysqlError) => {
    if (err) {
        console.error('error while connecting: ' + err.stack);
        return;
    }
    console.log('connected as id: ' + connection.threadId);
});

export { connection };