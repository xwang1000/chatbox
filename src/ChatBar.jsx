import React, {Component} from 'react';

class ChatBar extends Component {

  handleKeyPress = (event) => {

    const content = event.target
    if(event.key === 'Enter' && content.value){
      this.props.sendMessage(content.value)
      content.value = ''
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue={this.props.currentUser.name}
        />
        <input
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    )
  }
}
export default ChatBar
