import React, { Component } from "react";

class Chatbar extends Component {
  constructor() {
    super();
    this.state = {
      username: "Anonymous",
      content: ""
    }
  }

  render(props) {

    const onName = (event) => {
      this.setState({
        username: event.target.value
      })
    }

    const onContent = (event) => {
      this.setState({
        content: event.target.value
      });
    }

    const onEnter = (event) => {
      if (event.key === "Enter") {
        this.props.addMessage(this.state);
        event.target.value = "";
      }
    }

    const enterName = (event) => {
      if (event.key === "Enter"){
        this.props.addName(this.state.username)
        event.target.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={onName} onKeyPress={enterName} placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" onChange={onContent} onKeyPress={onEnter} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default Chatbar

