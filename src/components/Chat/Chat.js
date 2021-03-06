import React, {useState,useEffect, useCallback} from 'react';
import WithSidebarLayout from '../../Layouts/WithSidebarLayout/WithSidebarLayout';
import "./Chat.css";
import { Avatar, Button, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import io from "socket.io-client";
import { useStateValue } from '../../StateProvider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';


const Chat = () => {

    const [isLoading, setIsLoading] = useState(true);
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [{user},] = useStateValue();
    const [saveNewChats, setSaveNewChats] = useState(false);
    const [usersList, setUsersList] = useState();
    const [fromEmail, setFromEmail] = useState(user.email);
    const [sendToEmail, setSendToEmail] = useState("");
    const [socket,setSocket] = useState();
    const [allChatMessages,setAllChatMessages] = useState([
        {
            "fromEmail":"aman@gmail.com",
            "message":"Hiie buddy, how are you!",
            "sendToEmail":"tony@gmail.com"
        }
    ]);
    const [newChatMessages, setNewChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const setRef = useCallback(node => {
        if(node) {
            return node?.scrollIntoView({smooth: true})
        }
    },[])
    
    // video call functionality
    
    useEffect(() => {

        // console.log(sendToEmail);
        // console.log(fromEmail);

        setIsLoading(true);
        // fetching initials messages from db
        fetch(`${BASE_URL}/users/get-all-users`)
        .then(res => res.json())
        .then(res => {

            if("usersFetchedSuccessfully") {
                // console.log(res);
                setUsersList( (res.usersList).filter((thisUser) => thisUser?.email !== user?.email ) );
                setIsLoading(false);
            }else {
                alert(res.message)
            }
        })
        .catch(err => {
            console.log(err)
        })

        if(sendToEmail!=="") {

            let roomId ;

            if(fromEmail > sendToEmail) {
                var newSocket = io(BASE_URL,{ query:{id: fromEmail}});
                setSocket(newSocket);
                roomId = fromEmail;
            }else if(fromEmail < sendToEmail) {
                var newSocket = io(BASE_URL,{ query:{id: sendToEmail}});
                setSocket(newSocket);
                roomId = sendToEmail;
            }else {
                alert("not able to start new conversation!!!")
            }

            // console.log(roomId);
            window.setTimeout(() => {
                if(roomId) {
                    // fetching previous chats
                    fetch(`${BASE_URL}/messages/previous-chats?roomId=${roomId}`)
                    .then(res => res.json())
                    .then(res => {
    
                        if(res.message === "gotPreviousChatSuccessFully") {
                            // console.log(res);
                            setAllChatMessages([...res.previousChatMessages]);
                            

                        }else if("noPreviousChats") {
                            // console.log(res.message);
                        }else {
                            alert(res.message)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            },300);
            

            newSocket.on("connection-establish", data => {
                // console.log(data);
                // connection is established
            })

            // console.log(socket)
            if(newSocket) {
                newSocket.on("chat-message",messageObj => {
                    // console.log(messageObj);
                    setAllChatMessages((allChatMessages) => [...allChatMessages,{"fromEmail":messageObj.fromEmail,"message":messageObj.message,"sendToEmail":messageObj.sendToEmail}]);
                    setNewChatMessages((newChatMessages) => [...newChatMessages,{"fromEmail":messageObj.fromEmail,"message":messageObj.message,"sendToEmail":messageObj.sendToEmail}] )
                    
                })
            }
        }

        return () => newSocket?.close();
        
    },[sendToEmail])

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        // console.log("hello")

        if(message.trim()!=="") {
            socket.emit("send-chat-message",{"fromEmail":fromEmail,"message":message,"sendToEmail":sendToEmail});
            setAllChatMessages((allChatMessages) => [...allChatMessages,{"fromEmail":fromEmail,"message":message,"sendToEmail":sendToEmail}]);
            setNewChatMessages((newChatMessages) => [...newChatMessages,{"fromEmail":fromEmail,"message":message,"sendToEmail":sendToEmail}] )
            setMessage("");
            
        }
    }

    const handleUserForConversation = (newUserEmail) => {
        setSaveNewChats(false);
        setSendToEmail(newUserEmail);
        // console.log(newUserEmail);
    }

    return (
        <WithSidebarLayout>

            <div className="chat__right__bottombar">

                {
                    sendToEmail === ""
                    ?
                    (
                        <div className="chat__userBox">

                            <h2>Start a new conversation</h2>

                            {
                                isLoading
                                ?
                                (
                                    <LinearProgress />
                                )
                                :
                                (

                                    <List component="nav" aria-label="contacts">
                                        {
                                            usersList
                                            ?
                                            (
                                                <>
                                                    {
                                                        usersList.map((currentUser,index) => {
                                                            return (
                                                                <ListItem key={index} button onClick={() => handleUserForConversation(currentUser.email) } >
                                                                    <ListItemText primary={currentUser.email.split("@")[0]} />
                                                                </ListItem>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                            :
                                            ("")
                                        }
                                        {/* <ListItem button onClick={() => handleUserForConversation("aman@gmail.com") } >
                                            <ListItemText primary="aman@gmail.com" />
                                        </ListItem> */}
                                    </List>

                                )
                            }

                            

                        </div>
                    )
                    :
                    (
                        <div className="chat__chatting">
                            <div className="chat__chatting__top">
                                <div className="chat__chatting__top__left">
                                    <IconButton color="default" style={{"marginRight":"5px"}} onClick={() => { setSaveNewChats(true); setSendToEmail("");} }>
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Avatar alt="username" src="" />
                                    <p>{sendToEmail.split("@")[0]}</p>
                                </div>
                                <IconButton color="secondary" >
                                    <VideocamIcon />
                                </IconButton>
                            </div>

                            <div className="chat__messageContainer">

                                {
                                    allChatMessages?.length > 0
                                    ? 
                                    (
                                        <>
                                            {allChatMessages.map((item,index) => {

                                                var lastMessage = allChatMessages.length - 1 === index;
                                                if(item.sendToEmail === sendToEmail && item.fromEmail === fromEmail) { //fromEmail: my email, //sendToEmail: samne wale ki 
                                                    return (
                                                        <div ref={lastMessage ? setRef : null} key={index} className="chat__chatMessage__mine">
                                                            <p className="chat__primaryMessage">{item.message}</p>
                                                            <p className="chat__nameOnMessage__mine">you</p>
                                                        </div>
                                                    )
                                                }else if(item.sendToEmail === fromEmail && item.fromEmail === sendToEmail) {
                                                    return (
                                                        <div ref={lastMessage ? setRef : null} key={index} className="chat__chatMessage">
                                                            <p className="chat__primaryMessage">{item.message}</p>
                                                            <p className="chat__nameOnMessage">{item.fromEmail.split("@")[0]}</p>
                                                        </div>
                                                    )
                                                }else { return "" }
                                            })}
                                        </>
                                    )
                                    :
                                    ("")
                                }

                                {/* <div className="chat__chatMessage">
                                    <p className="chat__primaryMessage">message here</p>
                                    <p className="chat__nameOnMessage">user name</p>
                                </div>
                                <div className="chat__chatMessage__mine">
                                    <p className="chat__primaryMessage">message here</p>
                                    <p className="chat__nameOnMessage__mine">user name</p>
                                </div> */}
                                
                            </div>

                            <form className="chat__sendMessage" onSubmit={(e) => handleMessageSubmit(e)} >
                                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                                <Button type="submit" color="secondary">
                                    send
                                </Button>
                            </form>
                        </div>    
                    )
                }
                
                {/* <div className="chat__userBox">

                    <h2>Start a new conversation</h2>

                    <List component="nav" aria-label="contacts">
                        <ListItem button onClick={() => handleUserForConversation("aman@gmail.com") } >
                            <ListItemText primary="aman@gmail.com" />
                        </ListItem>
                        <ListItem button onClick={() => handleUserForConversation("tony@gmail.com") }>
                            <ListItemText primary="tony@gmail.com" />
                        </ListItem>
                    </List>

                </div> */}

            </div>
            
        </WithSidebarLayout>
    )
}

export default Chat;
