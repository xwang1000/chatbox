import React, {Component} from 'react'
import NavBar from './NavBar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import {data} from '../data.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      messages: data.messages
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");

      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        loading: false,
        messages: [...this.state.messages, newMessage]
      })
    }, 3000);
  }

  sendMessage = (content) => {
    const newMessage = {
      username: data.currentUser.name,
      content
    }
    this.setState({
      messages: [...this.state.messages, newMessage]
    })
  }

  render() {

    if (this.state.loading) {
      return <h1>Loading... </h1>
    }

    return (
      <div className="app">
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={data.currentUser} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App
