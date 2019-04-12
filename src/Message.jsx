import React, { Component } from "react";

class Message extends Component {
  render() {
    let output;
    if (this.props.type === "incomingMessage") {
      output = (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      )
    } else {
      output = (
      <div className="message system">{this.props.content}</div>
      )
    }
    return output;
  }
}

export default Message