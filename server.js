var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const uuidv1 = require('uuid/v1');

// WebSocket
const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const WS_PORT = 3001;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
})
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }
    
    console.log('Running at http://0.0.0.0:3000');
  });

const server = express()
  .use(express.static('public'))
  .listen(WS_PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ WS_PORT }`));

const wss = new SocketServer({ server });
const {updateClientNumber, broadcast, updateUser} = require('./webSocketHelper.js')(wss, WebSocket)

let counter = 0
let userColors = [
  '#F1A66A',
  '#A04668',
  '#7EA172',
  '#BBBE64'
]

// When the connection is created
wss.on('connection', (ws) => {
  console.log('Client connected');
  updateClientNumber()

  // Attach the unique color to this particular connection
  counter++
  ws.uniqueColor = userColors[counter % 4]

  // When received a message
  ws.on('message', (message) => {
    console.log('Message received')
    
    const {type, username, content, changedName} = JSON.parse(message)
    const newMessage = {
      username, content,
      broadcast: true
    }

    newMessage.id = uuidv1()
    switch(type) {
      case('postMessage'): 
        newMessage.type = 'incomingMessage'
        newMessage.color = ws.uniqueColor
        break;

      case('postNotification'):
        newMessage.type = 'incomingNotification'
        break;

      case('currentUser'):
        newMessage.broadcast = false
        ws.currentUser = newMessage.content

        updateUser(ws.currentUser, true, ws, changedName)
    }
    
    newMessage.broadcast && broadcast(newMessage)
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    updateClientNumber()
    updateUser(ws.currentUser, false, ws, false)
  })
})