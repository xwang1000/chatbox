import React from 'react'

function Message (props) {
  
  const handleMessage = () => {
    const {type, content, username, color} = props.message

    const nameStyle = {
      color: color, 
      opacity: '.5'
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
            <p className="message-username" style={nameStyle}>{username}</p>
            <p className="message-content" style={contentStyle}>{content}</p>
          </React.Fragment>
        )

      case('incomingNotification'):
          return (
            <span className="message-content" style={notificationStyle}>
              {content}
            </span>
          )
      case('incomingGif'): 
          return (
            <React.Fragment>
              <p className="message-username" style={nameStyle}>{username}</p>
              <span className="message-content">
                <img src={content} alt="gif" style={{height: '250px'}} />
              </span>
            </React.Fragment>
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
