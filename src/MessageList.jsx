import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {
    const msgList = this.props.messages.map(message => {
      return < Message type={message.type} key={message.id} username={message.username} content={message.content} />
    });

    return (
      <main className="messages">
        {msgList}
      </main>
    )
  }
}

export default MessageList