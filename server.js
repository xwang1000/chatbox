var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const uuidv1 = require('uuid/v1');

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

  // WebSocket
const express = require('express');
const SocketServer = require('ws').Server;
const WS_PORT = 3001;
  
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(WS_PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ WS_PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Message received')
    
    const {type, username, content} = JSON.parse(message)
    const newMessage = {
      username, content
    }
    console.log(message)

    newMessage.id = uuidv1()
    switch(type) {
      case('postMessage'): 
        newMessage.type = 'incomingMessage'
        break;

      case('postNotification'):
        newMessage.type = 'incomingNotification'
        break;
    }
    
    // broadcast to all
    wss.clients.forEach(client => {
      client.send(JSON.stringify(newMessage))
    })
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // ws.on('close', () => console.log('Client disconnected'));
  )}
)