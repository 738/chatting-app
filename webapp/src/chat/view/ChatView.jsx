import React from 'react';

class ChatView extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.messages.map((data, index) =>
                        <div key={index}>{data.from.name} : {data.msg}</div>
                    )
                }
                <input id="chat-input" type="text" placeholder="chat..." value={this.state.chatInput} onChange={this.onChatInputChanged.bind(this)} />
                <input type="button" value="전송" onClick={this.sendChat.bind(this)} />
            </div>
        );
    }
}