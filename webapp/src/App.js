import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Chance from 'chance';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://192.168.0.139:4001",
      messages: [],
      chatInput: "",
      user: {
        name: new Chance().animal(),
        id: new Chance().integer({ min: 0, max: 10000000 }),
      },
    }
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on('login', (name) => {
      console.log(`${name} is logged in`);
    });
    this.socket.on('chat', (data) => {
      console.log(`${data.from.name} : ${data.msg}`);
      this.updateMsg(data);
    });
  }

  componentDidMount() {
    console.log(this.state.user);
    this.socket.emit("login", this.state.user);
  }

  onChatInputChanged(e) {
    this.setState({
      ...this.state,
      chatInput: e.target.value,
    });
  }

  sendChat() {
    this.socket.emit("chat", { msg: this.state.chatInput });
    const msg = this.state.chatInput;
    this.setState({
      ...this.state,
      chatInput: "",
    }, () => {
      this.updateMsg({
        from: this.state.user,
        msg: msg,
      });
    });
  }

  updateMsg(data) {
    this.setState({
      ...this.state,
      messages: [...this.state.messages, data],
    });
  }

  render() {
    return (
      <div className="App">
        <input id="chat-input" type="text" placeholder="chat..." value={this.state.chatInput} onChange={this.onChatInputChanged.bind(this)}/>
        <input type="button" value="전송" onClick={this.sendChat.bind(this)}/>
        {
          this.state.messages.map((data, index) =>
            <div key={index}>{data.from.name} : {data.msg}</div>
          )
        }
      </div>
    );
  }
}

export default App;
