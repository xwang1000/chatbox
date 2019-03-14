import React from 'react'

function Message (props) {
  
  const handleMessage = () => {
    const {type, content, username} = props.message

    switch(type) {
      case('incomingMessage'):
        return (
          <span className="message-content" style={{color:'blue'}}>
            {content}
          </span>
        )
      case('incomingNotification'):
          return (
            <span className="message-content" style={{color:'red'}}>
              {content}
            </span>
          )
      default: 
        return (
          <span className="message-content">
            {content}
          </span>
        );
    }
  }

  return (
    <div className={'message'}>
      <span className="message-username">{props.message.username}</span>
      {handleMessage()}
    </div>
  )
  
}

export default Message
