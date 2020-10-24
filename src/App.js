import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
// import Home from "./components/Home/Home";
import Feeds from "./components/Feeds/Feeds";
import { useStateValue } from './StateProvider';
import Profile from './components/Profile/Profile';
import Upload from './components/Upload/Upload';
import PrivateRoute from "./PrivateRoute";
import Chat from './components/Chat/Chat';
import VideoCall from './components/VideoCall/VideoCall';
import io from "socket.io-client";

const App = () => {
  
  const [{user,authToken,socket},dispatch] = useStateValue();
  const BASE_URL = process.env.REACT_APP_BASE_URL
  
  useEffect(() => {
    
    // attach a socket
    var newSocket = io(BASE_URL,{ query:{id: "aman@gmail.com"}});
    
    newSocket.on("connection-establish", data => {
      console.log(data); 
      // connection is established
    })
    
    // setting socket globally
    dispatch({
      type:"SET_SOCKET",
      payload:{
        myNewSocket: newSocket
      }
    })

    return () => newSocket?.close();

  }, [])

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          
          <Route path="/signup">
            <SignUp />
          </Route>

          <PrivateRoute path="/feeds" >
            <Feeds />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile email={user?.email}  />
          </PrivateRoute>

          <PrivateRoute path="/chat">
            <Chat />
          </PrivateRoute>

          <Route path="/videocall">
            <VideoCall />
          </Route>

          {/* <Route path="/feeds">
             <Feeds />
          </Route> */}
       
          {/* <Route path="/profile">
            <Profile email={user?.email}  />
          </Route> */}
          

          {/* <Route path='/:username' render={(props) => {
            return ( 
              <div> 
                {` Hello ${props.match.params.username}`}
                {
                  false
                  ?
                  <h1>hiie this is your profile</h1>
                  :
                  <h1>login to see profile</h1>
                }
              </div> 
            )
          }} /> */}

          <Route path="/">
            <Upload />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
