const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const appServerPort = 4000;
const app = express();

const msgConfig = {
  "sender": "bot",
  "data": "",
  "userId": ""
}

const appServer = app.listen(appServerPort, function () {
  console.log("App server listening on port" + appServerPort);
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
});

server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + "WebSocket Server is listening on port "
    + webSocketsServerPort);
});

const wsServer = new webSocketServer({
  httpServer: server
});


const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const clients = {};
const users = {};


const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

wsServer.on('request', function (request) {
  var userId = getUniqueID();
  const connection = request.accept(null, request.origin);
  clients[userId] = connection;

  var greeting = {};
  greeting.data = msgConfig;
  greeting.data.userId = userId;
  var msgContent = {
    "type": "text",
    "from": "bot",
    "data": "Greetings from The good Shop Assistant! <br/> We will keep you posted on what others are buying. </br> Need help? Please drop a message."
  }
  greeting.data.data = JSON.stringify(msgContent);
  clients[userId].sendUTF(JSON.stringify(greeting.data));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      var dataFromClient = JSON.parse(message.utf8Data);
      dataFromClient.sender = "bot";
      var stringyMsg=dataFromClient;
      stringyMsg.data = JSON.stringify(dataFromClient.data);
      var userMsg = {};
      userMsg.data = stringyMsg;
      sendMessage(JSON.stringify(userMsg.data));
      if (JSON.parse(dataFromClient.data).from === "user") {
        stringyMsg={};
        userMsg={};
        stringyMsg['sender']="bot";
        stringyMsg['userId']=dataFromClient.userId;
        var textMsg= "Thanks " + JSON.parse(dataFromClient.data).userName + " for your message. <br/> We will get back to you shortly!";
        stringyMsg['data']=JSON.stringify({"type":"text","from":"bot","data":textMsg});
        userMsg.data = stringyMsg;
        sendMessage(JSON.stringify(userMsg.data));
      }
    }
  });

  connection.on('close', function (connection) {
    try {
      delete clients[userId];
      delete users[userId];
    }
    catch {
      console.log("Something went wrong on disconnecting session with" + userId);
    }
  });
});
