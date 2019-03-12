import React, {Component} from 'react'

class Message extends Component {

  render() {
    const {type, content, username} = this.props.message
    
    const system = type === 'incomingNotification' ? 'system' : ''

    return (
      <div className={'message ' + system}>
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    )
  }
}

export default Message
