#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    /* connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'" + " Time:" + new Date().getTime());
        }
    }); */
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
             connection.sendUTF(number.toString());
             console.log("Published: '" + number + "'" + " Time:" + new Date().getTime());
            setTimeout(sendNumber, 60000);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');