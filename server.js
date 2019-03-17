const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const {getGiphyURL} = require('./giphy')
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

const domainSpecificHandler = (cmd, ws, newMessage) => {
  
  if (cmd === 'giphy' || 'gif') {
    newMessage.type = 'incomingGif'
    getGiphyURL(newMessage.content)
      .then(url => {
        newMessage.content = url
        newMessage.color = ws.uniqueColor
        broadcast(newMessage)
      })
      .catch(err => console.log(err))
  }
}

// Unique color set
let counter = 0
let userColors = [
  '#493548',
  '#A04668',
  '#70A0AF',
  '#73937E'
]

// Anonymouse user mark
let anonymouseUserCount = 1

// When the connection is created
wss.on('connection', (ws) => {

  console.log('Client connected');
  // Update and broadcast everytime a connection is established
  updateClientNumber()

  // Attach the unique setup to this particular connection
  ws.uniqueColor = userColors[counter % 4]
  counter++

  ws.currentUser = 'Anonymous' + anonymouseUserCount
  anonymouseUserCount++


  // When received a message
  ws.on('message', (message) => {
    console.log('Message received')
    
    // Initial filling of new message
    let {type, username, content, changedName} = JSON.parse(message)
    let newMessage = {
      username: ws.currentUser, 
      content,
      // Set default broadcast option
      broadcast: true
    }
    
    // Handle domain specific command
    if (content[0] === '/') {

      const parts = content.split(' ')
      const cmd = parts[0].replace('/', '').toLowerCase()
    
      newMessage.content = parts.slice(1).join(' ')
      domainSpecificHandler(cmd, ws, newMessage)

    } else {

      // Handle other types

      newMessage.id = uuidv1()
      switch(type) {
        case('postMessage'): 
          newMessage.type = 'incomingMessage'
          newMessage.color = ws.uniqueColor
          break
  
        case('postNotification'):
          newMessage.type = 'incomingNotification'
          break
  
        case('currentUser'):
          newMessage.broadcast = false
          ws.currentUser = newMessage.content || ws.currentUser

          updateUser(ws.currentUser, true, ws, changedName)
          break
      }
      
      newMessage.broadcast && broadcast(newMessage)
    }

    
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    updateClientNumber()
    updateUser(ws.currentUser, false, ws, false)
  })
})
