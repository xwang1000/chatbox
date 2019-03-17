import React, {Component} from 'react'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      currentUser: '',
      messages: [],
      socket: new WebSocket('ws://localhost:3001'),
      numberOnline: 0
    }
  }

  updateConnectionUser (user = this.state.currentUser, changedName = false) {
    const message = {
      type: 'currentUser',
      content: user,
      changedName
    }

    this.state.socket.send(JSON.stringify(message))
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    const socket = this.state.socket

    socket.onopen = () => {
      console.log('opened connection')

      // Send current user name
      this.updateConnectionUser()
  
      socket.onmessage = (message) => {
        // document.querySelector(".messages").scrollIntoView(false)
        // window.scrollTo(0, document.querySelector(".messages").scrollHeight)
        const {data} = message
        const newMessage = JSON.parse(data)

        switch (newMessage.type) {
          case('clientNumber'): 
            this.setState({numberOnline: newMessage.clientsConnected})
            break
            return
          default:
            this.setState({
              messages: [...this.state.messages, newMessage]
            })
            break
        }

      }
    }
  }

  changeName = (newName) => {

    if (newName !== this.state.currentUser) {
      const message = {
        type: 'postNotification',
        content: `${this.state.currentUser || 'Anonymous'} changed his name to ${newName}`
      }
      
      this.state.socket.send(JSON.stringify(message))
      this.updateConnectionUser(newName, true)
      this.setState({currentUser: newName})
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
        <NavBar numberOnline={this.state.numberOnline} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeName={this.changeName} />
      </div>
    );
  }
}

export default App
