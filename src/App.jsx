import React, {Component} from 'react'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      currentUser: 'Bob',
      messages: [],
      socket: new WebSocket('ws://localhost:3001')
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    const socket = this.state.socket
    socket.onopen = () => {
      console.log('opened connection')
  
      socket.onmessage = (message) => {
        const {data} = message
        const newMessage = JSON.parse(data)

        this.setState({
          messages: [...this.state.messages, newMessage]
        })
      }
    }
  }

  changeName = (newName) => {
    if (newName !== this.state.currentUser) {
      const message = {
        type: 'postNotification',
        content: `${this.state.currentUser} changed his name to ${newName}`
      }
      this.state.socket.send(JSON.stringify(message))
    }
  }


  sendMessage = (newMessage) => {

    this.state.socket.send(JSON.stringify(newMessage))
  }

  render() {

    if (this.state.loading) {
      return <h1>Loading... </h1>
    }

    return (
      <div className="app">
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeName={this.changeName} />
      </div>
    );
  }
}

export default App
