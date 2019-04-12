import React, { Component } from 'react';
import Navbar from "./Navbar.jsx"
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: { name: "Anonymous" },
      messages: [],
      counter: 0
    }

  }

  addMessage = (message) => {
    message.type = "postMessage";
    message.username = this.state.currentUser.name;
    this.socket.send(JSON.stringify(message));
    // this.setState({ messages: newMessages })
  }

  addName = (name) => {
    let message = { type: "postNotification", content: `${this.state.currentUser.name} has changed their name to ${name}` }
    this.setState({ currentUser: { name: name } })
    this.socket.send(JSON.stringify(message));
  }

  // Called after the component was rendered and it was attached to the
  // DOM. This is a good place to make AJAX requests or setTimeout.
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("counter", data)
      if (Number.isInteger(data)) {
        this.setState({
          counter: data
        })
      } else {
        this.setState({
          messages: [...this.state.messages, data]
        })
      }
      this.setState({
        loading: false
      })
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }
  // Called any time the props or state changes. The JSX elements
  // returned in this method will be rendered to the DOM.
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <Navbar counter={this.state.counter}/>
          <Message />
          <MessageList messages={this.state.messages} />
          <ChatBar addMessage={this.addMessage} addName={this.addName} currentUser={this.state.currentUser} />
        </div>
      );
    }
  }
}
export default App;
