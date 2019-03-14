import React, {Component, useState} from 'react';

function ChatBar (props) {
  const [username, setUsername] = useState('Bob')

  const handleNameKeyPress = (event) => {
    const name = event.target.value
    if (event.key === 'Enter' && name) {
      props.changeName(name)
    }
    
  }

  const handleKeyPress = (event) => {

    const content = event.target
    
    if (event.key === 'Enter' && content.value){
      const newMessage = {
        type: 'postMessage',
        username, 
        content: content.value
      }
   
      props.sendMessage(newMessage)

      content.value = ''
    }
  }

  return (
    <footer className="chatbar">
      <input 
        className="chatbar-username" 
        placeholder="Your Name (Optional)" 
        defaultValue={props.currentUser}
        onChange={() => setUsername(event.target.value)}
        onKeyPress={handleNameKeyPress}
      />
      <input
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER" 
        onKeyPress={handleKeyPress}
      />
    </footer>
  )
}
export default ChatBar
