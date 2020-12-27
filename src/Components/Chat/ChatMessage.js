import React from 'react';
import { ListGroup } from "react-bootstrap";

class ChatMessage extends React.Component {

    render() {
        var messageObj = this.props.message;
        var messageData = JSON.parse(messageObj.data);
        if (messageData.from === "bot") {
            return (
                <div className="d-flex">
                    <div>
                        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Bot icon" className="chatIcon"></img>
                    </div>
                    <div className="botMessage mr-4">
                        <div dangerouslySetInnerHTML={{ __html: messageData.data }} className="msgBorder p-2"></div>
                    </div>
                </div>)
        } else if (messageData.from === "userAction") {
            if (messageData.type === "list") {
                var products = messageData.data.products;
                let items = [];
                products ? products.forEach((item, index) => {
                    items.push(
                        <ListGroup.Item className="customGreyBg">
                            <img src={item.pdtImg} width="35px" alt="item.pdtName"></img>
                            <span className="pl-3">{item.pdtName}</span>
                        </ListGroup.Item>);
                }) : items.push(null)
                return (
                    <div className="d-flex">
                        <div>
                            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Bot icon" className="chatIcon"></img>
                        </div>
                        <div className="botMessage mr-4">
                            <div className="msgBorder p-2">
                                <div className="mt-3 mb-3">
                                    <span>{messageData.data.firstName} just bought these products</span>
                                </div>
                                <ListGroup variant="flush" >
                                    {items.length > 0 ? items : null}
                                </ListGroup>
                            </div>
                        </div>
                    </div>)
            } else {
                return (<></>)
            }
        }
        else if (messageData.from === "user") {
            var userMsgClass = "userMessage";
            var msgPos = "d-flex toRight";
            var border = "p-2";
            if (messageObj.userId !== this.props.userId) {
                userMsgClass = "botMessage mr-4";
                msgPos = "d-flex";
                border = "msgBorder p-2 border-bottom";
                messageData.data = "<div class=\"border-bottom\">" + messageData.userName + " says:</div><br/>" + messageData.data;
            }
            return (
                <div className={msgPos}>
                    <div>
                        {userMsgClass === "botMessage mr-4" ?
                            <img src={process.env.PUBLIC_URL + '/images/user.png'} alt="Other user icon" className="userIcon"></img> : null}
                    </div>
                    <div className={userMsgClass}>
                        <div dangerouslySetInnerHTML={{ __html: messageData.data }} className={border}></div>
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }

    }
}
export default ChatMessage;