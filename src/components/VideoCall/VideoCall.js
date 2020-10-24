import React, { useEffect, useState } from 'react';
import "./VideoCall.css";
import Peer from "peerjs";
import { useStateValue } from '../../StateProvider';
import io from "socket.io-client";

const VideoCall = ({roomId, endVideoCall, socketForVideoCall}) =>  {

    const [{socket},] = useStateValue();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [currentVideo, setCurrentVideo] = useState();

    // temporary for testing
    useEffect(() => {

        roomId = "aman@gmail.com";
        // endVideoCall => in chat.js => just console logging right now
        console.log(roomId);

        //fake socket
        var newSocket = io(BASE_URL,{ query:{id: "aman@gmail.com"}});
        
        newSocket.on("connection-establish", data => {
            console.log(data); 
            // connection is established
        })

        newSocket.emit("join-video-call",roomId, 10);

        return () => newSocket?.close();

    },[])

    const peer = new Peer(undefined, {
        host: "/",
        port:"3000"
    })

    // streaming videos
    useEffect(() => {

        // streaming my own video
        const myVideo = document.getElementById("video__videoGrid__myVideo");
        const friendsVideo = document.getElementById("video__videoGrid__friendsVideo")

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
    
            // myVideoStream = stream;
            myVideo.srcObject = stream;
            myVideo.onloadedmetadata = (e) => {
                myVideo.play();
            }

            // addVideoStream(myVideo, stream);
        }).catch((err) => {
            console.log(err);
        })
    
    }, [])

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListner("loadmetadata", () => {
            video.play();
            setCurrentVideo(video);
        })
        // videoGrid?.append(video);
    }

    // 59.45

    // const myVideo = document.createElement("video");
    // myVideo.muted = true;
    // const peers = {};
    // navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true
    // }).then(stream => {
    //     addVideoStream(myVideo, stream)

    //     peer.on("call", call => {
    //         call.answer(stream);
    //         const video = document.createElement("video")
    //         call.on("stream",userVideoStream => {
    //             addVideoStream(video, userVideoStream)
    //         })
    //     })

    //     socket.on('user-connected', userId => {
    //         connectToNewUser(userId, stream)
    //       })

        


    // } )

    return (
        <div>
            {/* video of video call */}
            <button onClick={() => console.log(socket)} >click</button>
            <div id="video__videoGrid">
                <video id="video__videoGrid__myVideo" width="500" height="500" autoPlay={true} muted={true} />
                <video id="video__videoGrid__friendsVideo" width="300" height="300" autoPlay={true} muted={false} />
            </div>
        </div>
    )
}

export default VideoCall;