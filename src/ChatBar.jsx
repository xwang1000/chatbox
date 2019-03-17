import React, {Component, useState} from 'react';

// Converted to functional component with React Hooks
function ChatBar (props) {

  // Hook the username state to setUsername function
  const [username, setUsername] = useState('')

  const handleNameKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.changeName(username)
    }
    
  }

  const handleKeyPress = (event) => {
    
    const content = event.target
    
    if (event.key === 'Enter' && content.value){
    
      // If the input name is also changed
      if (props.currentUser !== username) {
        props.changeName(username)
      }

      // Post new message
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
