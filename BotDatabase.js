var connection;
function handleConnection() {
    connection = require('mysql').createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "gambling4lyfe"
    });
    connection.connect(err => {if (err) return setTimeout(handleConnection, 2000)});
    connection.on('error', err => { if(err.code === 'PROTOCOL_CONNECTION_LOST') handleDisconnect(); else throw err });
}
handleConnection()

module.exports = connection;