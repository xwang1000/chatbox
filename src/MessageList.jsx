import React, {Component} from 'react'
import Message from './Message.jsx'
import {generateRandomId} from './utils.js'

class MessageList extends Component {
  
  render() {

    const { messages } = this.props
    return (
      <main className="messages">
        {messages.map(message => <Message key={generateRandomId()} message={message} />)}
      </main>
    )
  }
}

export default MessageList