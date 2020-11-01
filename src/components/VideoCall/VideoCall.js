import React, { useEffect, useState } from 'react';
import "./VideoCall.css";
import Peer from "peerjs";
import { useStateValue } from '../../StateProvider';
import io from "socket.io-client";

const VideoCall = ({roomId, endVideoCall, socketForVideoCall}) =>  {

    const [{socket},] = useStateValue();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [currentVideo, setCurrentVideo] = useState();
    

    // peer initialization
    const peer = new Peer(undefined, {
        path:"/peerjs",
        host: "/", 
        port:"8000" //node server port
    })

    // temporary for testing
    useEffect(() => {

        const myVideo = document.getElementById("video__videoGrid__myVideo");
        const friendsVideo = document.getElementById("video__videoGrid__friendsVideo")

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

    // streaming videos

        // streaming my own video
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {

            // myVideoStream = stream;
            addVideoStream(myVideo, stream)
            peer.on("call",call => {
                call.answer(stream);
                call.on("stream",friendsVideoStream => {
                    addVideoStream(friendsVideo,friendsVideoStream);
                })
            })

            newSocket.on("user-connected-on-video-call", (userId) => {
                connectToNewUser(userId,stream,friendsVideo);
            })

        })
        // .catch((err) => {
        //     console.log(err);
        // })
        
        peer.on("open", id => {
            // console.log("peerid-frontend "+id);
            newSocket.emit("join-room-on-video-call",roomId, id);
        })

        // clearing the socket on exit
        return () => newSocket?.close();

    
    }, [])

    const connectToNewUser = (userId, stream, friendsVideo) => {
        console.log(userId)
        const call = peer.call(userId, stream);
        // video element to render a call
        call.on("stream",friendsVideoStream => {
            addVideoStream(friendsVideo, friendsVideoStream);
        })

        call.on('close', () => {
            console.log("stream closed")
        })
    }

    const addVideoStream = (video, stream) => {
        console.log(video)
        video.srcObject = stream;
        video.addEventListner("loadmetadata", () => {
            video.play();
        })
    }

    // 1.32

    return (
        <div>
            {/* video of video call */}
            <button onClick={() => console.log(socket)} >click</button>
            <div id="video__videoGrid">
                <video id="video__videoGrid__myVideo" width="300" height="300" autoPlay={true} muted={true} />
                <video id="video__videoGrid__friendsVideo" width="300" height="300" autoPlay={true} muted={false} />
            </div>
        </div>
    )
}

export default VideoCall;