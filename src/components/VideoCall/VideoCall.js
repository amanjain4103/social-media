import React, { useEffect, useRef, useState } from 'react';
import "./VideoCall.css";
import Peer from "peerjs";
import { useStateValue } from '../../StateProvider';
import io from "socket.io-client";
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';
import {useHistory} from "react-router-dom";
import WithSidebarLayout from '../../Layouts/WithSidebarLayout/WithSidebarLayout';
import LinearProgress from '@material-ui/core/LinearProgress';


const VideoCall = ({isVideoCallReceiver:isItReceiver, videoCallPromptDataAsReceiver}) =>  {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [{user}, dispatch] = useStateValue();
    const VIDEO_CALL_SERVER_URL = process.env.REACT_APP_VIDEO_CALL_SERVER_URL;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [isVideoGridVisible, setIsVideoGridVisible] = useState(false);
    const myVideoRef = useRef(null);
    const myVideoAsReceiverRef = useRef(null);
    const friendVideoRef = useRef(null);
    const friendVideoAsReceiverRef = useRef(null);
    const [myVideoStream, setMyVideoStream] = useState(null);
    const [canIProceedToVideoCall, setCanIProceedToVideoCall] = useState(false);
    const [usersList, setUsersList] = useState();
    const [currentSocket, setCurrentSocket] = useState(null);

    const [peer, setPeer] = useState( new Peer(undefined, {
                                        secure: true,
                                        path:"/peerjs",
                                        host: "social-media-video-call-server.herokuapp.com", 
                                        port:"443" //node server port
                                    }) )

    const [isVideoCallReceiver, setIsVideoCallReceiver] = useState(isItReceiver);

    // peer initialization
    // const peer = new Peer(undefined, {
    //     secure: true,
    //     path:"/peerjs",
    //     host: "social-media-video-call-server.herokuapp.com", 
    //     port:"443" //node server port
    // })

    useEffect(() => {
        
        setIsLoading(true);
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

        

    },[])
    

    peer.on("close", () => {
        // console.log("peer closed ");
        
        setPeer( new Peer(undefined, {
            secure: true,
            path:"/peerjs",
            host: "social-media-video-call-server.herokuapp.com", 
            port:"443" //node server port
        }) );



        if(isVideoCallReceiver) {
            
            if(myVideoAsReceiverRef) {
                myVideoAsReceiverRef.current.srcObject = null;
            }

            if(friendVideoAsReceiverRef) {
                friendVideoAsReceiverRef.current.srcObject = null;
            }
            

        }else {

            if(myVideoRef) {
                myVideoRef.current.srcObject = null;
            }
            
            if(friendVideoRef) {
                friendVideoRef.current.srcObject = null;
            }
            

        }

        
        setIsVideoCallReceiver(false);
        setIsVideoGridVisible(false);
        
        
        //removing audio/video tracks

        if(myVideoStream) {

            let audioTrack = myVideoStream.getAudioTracks();

            if (audioTrack.length > 0) {

                audioTrack.forEach((track) => {
                    track.stop();
                })
                myVideoStream.removeTrack(audioTrack[0]);

            }

            let videoTrack = myVideoStream.getVideoTracks();

            if (videoTrack.length > 0) {

                videoTrack.forEach((track) => {
                    track.stop();
                })
                myVideoStream.removeTrack(videoTrack[0]);

            }

        }
        

    })

    useEffect(() => {
        
        // behave as a receiver
        // videoCallFrom => someone else email,  videoCallTo => my email as a receiver

        if(isVideoCallReceiver) {

            
            
            const newUniqueSocketForVideoCallAsAReceiver = io(VIDEO_CALL_SERVER_URL, { query:{id: `${videoCallPromptDataAsReceiver.videoCallFrom}123` }} )
            
            newUniqueSocketForVideoCallAsAReceiver.on("connected", () => {
                // console.log("initiated video call as a receiver")
                setCurrentSocket(newUniqueSocketForVideoCallAsAReceiver);
                
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(myStream => {

                    setMyVideoStream(myStream);
                    addVideoStream(myVideoAsReceiverRef, myStream)

                    peer.on('call', call => {
                        call.answer(myStream)
                        
                        call.on('stream', userVideoStream => {
                            addVideoStream(friendVideoAsReceiverRef, userVideoStream)
                        })

                        
                        
                    })
                })

            })

            peer.on('open', id => {
                // console.log(id)
                newUniqueSocketForVideoCallAsAReceiver.emit('i-want-to-join-video-call', `${videoCallPromptDataAsReceiver.videoCallFrom}123`, id);
            })

            
        }

        


    }, [isVideoCallReceiver,videoCallPromptDataAsReceiver])

    

    const makeAVideoCall = (videoCallFrom, videoCallTo) => {
        
        // console.log("video call from  " + videoCallFrom + " video call to  " + videoCallTo);
        

        const newSocket = io(VIDEO_CALL_SERVER_URL, { query:{id: user.email}} ) //caller user email
        
        newSocket.on("connected", () => {
            // console.log("connected to video call server");
            
            newSocket.emit("ask-for-video-call",{"videoCallFrom":videoCallFrom, "videoCallTo":videoCallTo})
        
            newSocket.on("response-to-video-call-prompt", (data) => {
                // console.log("isReadyForVideoCall : " + data.isReadyForVideoCall);

                if(data.isReadyForVideoCall) {
                    // that means we have a confirmation for video call and other person is also online
                    setIsVideoGridVisible(true);
                    setCanIProceedToVideoCall(true);

                    //doing a video call as a caller

                    

                    const newUniqueSocketForVideoCall = io(VIDEO_CALL_SERVER_URL, { query:{id: `${videoCallFrom}123`}} )
                    
                    newUniqueSocketForVideoCall.on("connected", () => {
                        // console.log("video call initiated");
                        
                        setCurrentSocket(newUniqueSocketForVideoCall);

                        newUniqueSocketForVideoCall.on("on-receiving-receivers-userid", (ReceiversUserID) => {
                            
                            // console.log(ReceiversUserID)
                            
                            // now make a call using peerjs to the userid I just got
                            
                            // getting my camera stream
                            navigator.mediaDevices.getUserMedia({
                                video: true,
                                audio: true
                            }).then(myStream => {

                                setMyVideoStream(myStream);
                                connectToReceiver(ReceiversUserID, myStream);
                                addVideoStream(myVideoRef, myStream)
                            })
                            
                            
                        })

                    })

                    
                    
                   

                }else {
                    //clear state 
                    newSocket.close();
                    setIsVideoGridVisible(false);
                    setCanIProceedToVideoCall(false);
                    alert("The person denied for video call !!!");
                }

            })
        
            // waiting for 60 second to someone accept the video call otherwise end the call
            // window.setTimeout(() => {
            //     if(!isVideoGridVisible) {
            //         alert("either the person you are calling is offline or rejected you call");
            //         newSocket.close();
            //     }
            // },60000)
        
        })

    }
    
    const connectToReceiver = (userID, myStream) => {

        const call = peer.call(userID, myStream);
        
        call.on('stream', userVideoStream => {
            addVideoStream(friendVideoRef, userVideoStream)
        })
        
    }

    const addVideoStream = (videoRef, stream) => {
        videoRef.current.srcObject = stream;
    }

    return (
        <>

            {
                isVideoCallReceiver
                ?
                (
                    <div id="video__videoGrid">

                        <video className="video__videoGrid__myVideo" width="200" height="200" ref={myVideoAsReceiverRef} autoPlay={true} muted={true} />
                        <video className="video__videoGrid__friendsVideo" width="200" height="200" ref={friendVideoAsReceiverRef} autoPlay={true} muted={false} />
                        <div className="video__videoGrid__endCallBtn">
                            <IconButton color="primary" onClick={() => {
                                
                                peer.destroy();
                                currentSocket.close();
                                history.push("/videocall");
                                

                                dispatch({
                                    type:"CLOSE_RECEIVERS_VIDEO_CALL_VIEW",
                                    payload:{
                                      wantToCloseReceiversVideoCallView: true
                                    }
                                }) 

                            }} >
                                <CallEndIcon style={{ fontSize: 30 }} />
                            </IconButton>
                        </div>
                    </div>
                )
                :
                (
                    <>
                        {
                            isVideoGridVisible
                            ?
                            (
                                <div id="video__videoGrid">
                                    
                                    <video className="video__videoGrid__myVideo" width="200" height="200" ref={myVideoRef} autoPlay={true} muted={true} />
                                    <video className="video__videoGrid__friendsVideo" width="200" height="200" ref={friendVideoRef} autoPlay={true} muted={false} />
                                    
                                    <div className="video__videoGrid__endCallBtn">
                                        <IconButton color="primary" onClick={() => {
                                            
                                            peer.destroy();
                                            currentSocket.close();
                                            history.push("/videocall");

                                            dispatch({
                                                type:"CLOSE_RECEIVERS_VIDEO_CALL_VIEW",
                                                payload:{
                                                  wantToCloseReceiversVideoCallView: true
                                                }
                                            })
                                            
                                        }} >
                                            <CallEndIcon style={{ fontSize: 30 }} />
                                        </IconButton>
                                    </div>

                                </div>
                            )
                            :
                            (
                                <WithSidebarLayout>
                                    <div className="chat__userBox videocall__userBox">

                                        <h2>Start a Video Call</h2>

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
                                                                            <ListItem key={index} button onClick={() => makeAVideoCall(user.email, currentUser.email) } >
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

                                                    {/* <ListItem button onClick={() => makeAVideoCall("aman@gmail.com","akku@gmail.com") } >
                                                        <ListItemText primary="akku@gmail.com" />
                                                    </ListItem> */}
                                                </List>

                                            )
                                        }

                                        

                                    </div>
                                </WithSidebarLayout>
                            )
                        }
                    </>
                )
            }

            
            
        </>
    )
}

export default VideoCall;