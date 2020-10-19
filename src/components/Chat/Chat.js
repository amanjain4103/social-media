import React from 'react';
import WithSidebarLayout from '../../Layouts/WithSidebarLayout/WithSidebarLayout';
import { SidebarButton } from '../Buttons/Buttons';
import {useHistory} from "react-router-dom";
import "./Chat.css";
import { Avatar, Button, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';

const Chat = () => {

    const history = useHistory();

    return (
        <WithSidebarLayout>

            <div className="chat__right__bottombar">
                {/* <div className="chat__userBox">

                    <h2>Start a new conversation</h2>

                    <List component="nav" aria-label="contacts">
                        <ListItem button color="primary" onClick={() => console.log("clicked") } >
                            <ListItemText primary="aman@gmail.com" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="tony@gmail.com" />
                        </ListItem>
                    </List>


                </div> */}

                <div className="chat__chatting">
                    <div className="chat__chatting__top">
                        <div className="chat__chatting__top__left">
                            <Avatar alt="username" src="" />
                            <p>aman@gmail.com</p>
                        </div>
                        <IconButton color="secondary" >
                            <VideocamIcon />
                        </IconButton>
                    </div>

                    <div className="chat__messageContainer">
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                        <div className="chat__chatMessage">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage">user name</p>
                        </div>
                        <div className="chat__chatMessage__mine">
                            <p className="chat__primaryMessage">message here</p>
                            <p className="chat__nameOnMessage__mine">user name</p>
                        </div>
                    </div>

                    <form className="chat__sendMessage">
                        <input type="text" />
                        <Button color="secondary" >
                            send
                        </Button>
                    </form>
                </div>
                
            </div>
        </WithSidebarLayout>
    )
}

export default Chat;
