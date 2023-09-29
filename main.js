/*
        --- Main.js ---

        By Nahoo (29 / 9 / 2023)
*/

const net = require('net');
const PORT = 15452;

var clients = [];

const server = net.createServer((socket) =>
{
    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    clients.push(socket);

    socket.on('data', (data) => 
    {
        socket.write(data);

        console.log('data: ', data, data.toString())
    });

    socket.on('end', () =>
    {
        console.log('end, socket disconnected', socket.name);
    });

    socket.on('close', () =>
    {
        console.log('close, socket disconnected', socket.name);
    });

    socket.on('error', (error) => 
    {
        if(error.errno != -4077) // This is an error often produced as the GM client disconnects
        {
            console.log('error, socket disconnected', error);
        }
    });
});

server.listen(PORT);

console.log("Starting!");
