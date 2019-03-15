module.exports = function (wss, WebSocket) {

  const broadcast = (data, includeCurrentClient = true, ws) => {
    
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN && (includeCurrentClient ? true : client !== ws)) {
        client.send(JSON.stringify(data));
      }  
    });
  }

  const updateClientNumber = () => {
  
    const data = {
      type: 'clientNumber',
      clientsConnected: wss.clients.size,
    }

    broadcast(data)
  }

  const updateUser = (user, login, ws, changedName) => {
    const data = {
      type: 'incomingNotification',
      content: user + (login ? ' joined the conversation' : ' left the conversation')
    }

    !changedName && broadcast(data, false, ws)
  }


  return {
    broadcast, 
    updateClientNumber,
    updateUser
  }
}
