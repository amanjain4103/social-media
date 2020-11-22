import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Feeds from "./components/Feeds/Feeds";
import { useStateValue } from './StateProvider';
import Profile from './components/Profile/Profile';
import PrivateRoute from "./PrivateRoute";
import Chat from './components/Chat/Chat';
import VideoCall from './components/VideoCall/VideoCall';
import io from "socket.io-client";
import FullScreenOverlayLayout from './Layouts/FullScreenOverlayLayout/FullScreenOverlayLayout';
import { MyBasicButton } from './components/Buttons/Buttons';

const App = () => {
  
  const [{user,wantToCloseReceiversVideoCallView},dispatch] = useStateValue();
  const VIDEO_CALL_SERVER_URL = process.env.REACT_APP_VIDEO_CALL_SERVER_URL;
  const [isSomeoneAskingForAVideoCall, setIsSomeoneAskingForAVideoCall] = useState(false);
  const [videoCallPromptData, setVideoCallPromptData] = useState({ videoCallFrom: 'someone@gmail.com', videoCallTo: 'someone@gmail.com' });
  const [videoCallSocket, setVideoCallSocket] = useState(null);
  const [canIProceedToVideoCall, setCanIProceedToVideoCall] = useState(false);

  useEffect(() => {
    
    if(wantToCloseReceiversVideoCallView) {
      setCanIProceedToVideoCall(false);
    }

  }, [wantToCloseReceiversVideoCallView])
  
  useEffect(() => {
    
    // attach a socket
    // var newSocket = io(VIDEO_CALL_SERVER_URL,{ query:{id: "common@gmail.com"}});
    var newSocket = io(VIDEO_CALL_SERVER_URL, { query:{id: user.email}});  //the listener user id 
    
    newSocket.on("plz-end-this-query-session", () => {
      setCanIProceedToVideoCall(false);
    })

    newSocket.on("connected", () => {
      // console.log("listening for video calls");
      // connection is established
      setVideoCallSocket(newSocket);

      newSocket.on("asking-for-video-call", (data) => {
        // use ui to ask for if he wants to join a video call or not
        setIsSomeoneAskingForAVideoCall(true);
        setVideoCallPromptData(data);

        

        // alert(data.videoCallFrom + " is asking for video call");
        // newSocket.emit("responding-to-video-call-prompt",{...data, "isReadyToVideoCall":true})
      })
    
    })

    

    newSocket.on('disconnect', function () {
        // console.log('disconnected with realtime feeds event');
    });

    return () => newSocket?.close()

  }, [user])

  const handleCloseVideoCallPrompt = () => {
    setIsSomeoneAskingForAVideoCall(false);
    videoCallSocket.emit("responding-to-video-call-prompt",{...videoCallPromptData, "isReadyToVideoCall":false})
    
  }

  const handlePromptAndProceedForVideoCall = () => {
    setIsSomeoneAskingForAVideoCall(false);
    videoCallSocket.emit("responding-to-video-call-prompt",{...videoCallPromptData, "isReadyToVideoCall":true})
  
    //toggle the view to receive video call
    dispatch({
      type:"CLOSE_RECEIVERS_VIDEO_CALL_VIEW",
      payload:{
        wantToCloseReceiversVideoCallView: false
      }
    }) 
    setCanIProceedToVideoCall(true);

  }
 

  return (
    <Router>
      <div className="App">

        {
          canIProceedToVideoCall
          ?
          (
            <div className="App__videoCallReceiver">
              <VideoCall isVideoCallReceiver={true} videoCallPromptDataAsReceiver={videoCallPromptData} />
            </div>
          )
          :
          ("")
        }

        {
          isSomeoneAskingForAVideoCall
          ?
          (
            <>
              <FullScreenOverlayLayout handleCloseFunc={handleCloseVideoCallPrompt}>
                <div className="App__videoCallPrompt">
                  <h3>"{videoCallPromptData.videoCallFrom.split("@")[0].toUpperCase()}" is asking you for a VIDEO Call !!!</h3>
                  <h4><em>Do you want to Connect?</em></h4>
                  <br />
                  <div className="App__videoCallButtons"> 
                    
                    <MyBasicButton
                        variant="contained"
                        color="primary"
                        onClick={handlePromptAndProceedForVideoCall}
                    >
                      Yes
                    </MyBasicButton>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <MyBasicButton
                        variant="contained"
                        color="primary"
                        onClick={handleCloseVideoCallPrompt}
                    >
                      No
                    </MyBasicButton>

                  </div>
                </div>
              </FullScreenOverlayLayout>
            </>
          )
          :
          ("")
        }

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

          <PrivateRoute path="/videocall">
            <VideoCall isVideoCallReceiver={false} videoCallPromptDataAsReceiver={""} />
          </PrivateRoute>

          <PrivateRoute path="/">
            <SignIn />
          </PrivateRoute>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
