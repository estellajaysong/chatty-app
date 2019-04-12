import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {
    // console.log(messages)
    const msgList = this.props.messages.map(message => {
      return < Message type={message.type} key={message.id} username={message.username} content={message.content} />
    });

    return (
      <main className="messages">
        {msgList}
        {/* <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div> */}
      </main>
    )
  }
}

export default MessageList