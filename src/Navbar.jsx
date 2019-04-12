import React, { Component } from "react";
//  

// {this.props.counter}
class Navbar extends Component {
  render() {
    return (
    <nav className="navbar">
    <a href="/" className="navbar-brand">Chatty</a>
    <div id="user-counter">{this.props.counter === 1 ? `${this.props.counter} user online` :  `${this.props.counter} users online`}</div>
    </nav>
    )
  }
}

export default Navbar
