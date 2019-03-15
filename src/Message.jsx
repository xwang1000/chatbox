import React from 'react'

function Message (props) {
  
  const handleMessage = () => {
    const {type, content, username, color} = props.message

    const nameStyle = {
      color: color, 
      opacity: '.4'
    }

    const contentStyle = {
      color: color,
      opacity: '1'
    }

    const notificationStyle = {
      color: 'grey',
      fontStyle: 'italic'
    }

    switch(type) {
      case('incomingMessage'):
        return (
          <React.Fragment>
            <span className="message-username" style={nameStyle}>{username}</span>
            <span className="message-content" style={contentStyle}>{content}</span>
          </React.Fragment>
        )

      case('incomingNotification'):
          return (
            <span className="message-content" style={notificationStyle}>
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
      {handleMessage()}
    </div>
  )
  
}

export default Message
