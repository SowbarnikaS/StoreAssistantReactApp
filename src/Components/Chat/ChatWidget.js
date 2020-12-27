import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button, Card } from "react-bootstrap";
import ChatMessage from './ChatMessage';
import { Jumbotron } from 'react-bootstrap';


class ChatWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            chatOn: false,
            chatSessionInit: false,
            chatSessionId: "",
            orderPlaced: false
        }
        this.keyboardCapture = React.createRef();
        this.messagesEnd = React.createRef();
        this.messages = [];
        this.wsClient = null;

    }

    componentDidMount() {
        this.wsClient = new W3CWebSocket('ws://127.0.0.1:8000');

        this.wsClient.onopen = () => {
            console.log('Connected to Chat room server');
        };

        this.wsClient.onerror = (err) => {
            console.log("Connection to Chat room server failed");
        }
        this.wsClient.onmessage = (msg) => {
            var message = JSON.parse(msg.data);
            if (this.state.chatSessionId.length === 0) {
                this.setState({ chatSessionId: message.userId });
                if (JSON.parse(message.data).from === "bot") {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            } else if(this.state.chatSessionInit){
                this.setState({
                    messages: [...this.state.messages, message]
                })
            }
            else{}
        }
    }

    closeChat = (e) => {
        this.setState({ chatOn: false });
        this.props.close(false);
    }

    onUserMessage = (e) => {
        if (this.keyboardCapture.current.value.length > 0) {
            var msg = {
                "data": {
                    "type": "text",
                    "from": "user",
                    "data": this.keyboardCapture.current.value,
                    "userName": this.props.userName
                },
                "userId": this.state.chatSessionId
            }
            this.sendMessage(msg);
            this.keyboardCapture.current.value = "";
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onUserMessage();
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }


    componentDidUpdate() {
        if (this.props.displayChat) {
            if (!this.state.chatSessionInit) {
                this.setState({ chatSessionInit: true })
            }
            this.scrollToBottom();

        }
        if (Object.keys(this.props.orderPlaced).length !== 0 && this.props.orderPlaced.constructor === Object &&
            this.state.orderPlaced === false) {
            var orderMsg = {
                "data": {
                    "type": "list",
                    "from": "userAction",
                    "data": this.props.orderPlaced
                },
                "userId": this.state.chatSessionId
            }
            this.sendMessage(orderMsg);
            this.setState({ orderPlaced: true })
        }
    }

    sendMessage = (msgData) => {
        var json = {};
        json.data = msgData;
        this.wsClient.send(JSON.stringify(json.data));
    }

    render() {
        let items = [];
        let noConnection = false;
        if (this.props.displayChat) {
            if (this.wsClient.readyState !== 1) {
                noConnection = true;
                items.push(<div className="col-12">
                    <Jumbotron>
                        <h6>Oops, Something went wrong!</h6>
                        <span>Sorry, Unable to reach the assistant currently.</span><span> Please try again after sometime</span>
                    </Jumbotron>
                </div>);
            } else {
                this.state.messages ? this.state.messages.forEach((item, index) => {
                    items.push(
                        <div key={index} className="col-12 msgDisplay">
                            <ChatMessage message={item} userId={this.state.chatSessionId}></ChatMessage>
                        </div>);
                }) : items.push(null)
            }
            return (
                <div className="chatWindow">
                    <Card className="chatWidget">
                        <Card.Header className="p-2 widgetHeader">
                            <div className="row align-items-center">
                                <div className="col-2">
                                    <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Chat icon" className="chatHeadericon"></img>
                                </div>
                                <div className="col-8 p-0">
                                    <span className="cusTitle">The Good Shop Assistant</span>
                                </div>
                                <div className="col-2 text-right">
                                    <Button className="noBtnStyle" onClick={this.closeChat}>
                                        x
                                    </Button>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="chatBody">
                            <div class="row">
                                {items.length > 0 ? items : null}
                            </div>
                            <div ref={this.messagesEnd}></div>
                        </Card.Body>
                        <Card.Footer className="border-top-0 p-1">
                            <div className="d-flex">
                                <div className="avail-width">
                                    <input className="form-control" type="text" ref={this.keyboardCapture} onKeyPress={this.handleKeyPress} ></input>
                                </div>
                                <div className="text-right">
                                    <Button className="btn btn-primary" onClick={this.onUserMessage} disabled={noConnection}>
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            );
        }
        else
            return (<></>)
    }


}
export default ChatWidget;