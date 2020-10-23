import React from 'react';
import "./VideoCall.css";

const VideoCall = ({roomId, endVideoCall}) =>  {

    // const peer = new Peer(undefined, {
    //     host: "/",
    //     port:"3000"
    // })

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
        </div>
    )
}

export default VideoCall;