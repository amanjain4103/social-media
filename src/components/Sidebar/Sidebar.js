import React, {useEffect,useState} from 'react';
import { SidebarButton,MyBasicButton } from '../Buttons/Buttons';
import {Button, LinearProgress, TextField} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ForumIcon from '@material-ui/icons/Forum';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PublishIcon from '@material-ui/icons/Publish';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import "./Sidebar.css";
import { useStateValue } from '../../StateProvider';
import {useHistory} from "react-router-dom";
import FullScreenOverlayLayout from '../../Layouts/FullScreenOverlayLayout/FullScreenOverlayLayout';
import storage from "../../firebase.js"
import io from "socket.io-client";

function Sidebar() {

    const history =  useHistory();
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [{user,authToken},dispatch] = useStateValue();
    const [ isUploadCompVisible, setIsUploadCompVisible] = useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL; //exposed by react already I am just using it
    const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
    const [imageToBeUploaded,setImageToBeUploaded] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState(null);
    
    const handleProfile = () => {

    }

    // realtime feeds on upload
    const [socketForFeedUpload,setSocketForFeedUpload] = useState(null);

    useEffect(() => {
    
        // attach a socket
        var newSocket = io(BASE_URL,{ query:{id: "common@gmail.com"}});
        
        newSocket.on("connection-establish", data => {
          console.log(data); 
          // connection is established
          setSocketForFeedUpload(newSocket);
        })
    
        
    
        newSocket.on("new-feed",() => {
            
            // console.log("new feed available")
            // new post is in data.data
            // console.log(data)

            dispatch({
              type:"SET_NEW_FEED_COUNT",
              payload:{
                newFeedCount: 1
              }
            }) 
        })
    
        newSocket.on('disconnect', function () {
            console.log('disconnected with realtime feeds event');
        });
    
        return () => newSocket?.close()
    
    }, [user])


    const toggleSmallScreenSidebar = () => {
        setIsSidebarToggled((prevCondition) => (!prevCondition))
    }

    useEffect(() => {
        window.addEventListener("resize", () => { 
                // console.log(window.innerWidth); 
                setScreenSize(window.innerWidth);
            } 
        );
      
        return (() => {
            // window.removeEventListener("resize");
        })

    },[])


    const sidebarJsx =() => {
        return (
            <div className="sidebar__container">
                
                {
                    isSidebarToggled
                    ?
                    (
                        <div className="sidebar__upper">
                            <SidebarButton
                                variant="contained"
                                color="primary" 
                                fullWidth
                                onClick={toggleSmallScreenSidebar}
                                startIcon={<MenuOpenIcon style={{ fontSize: 40 }} />}
                            >
                                go back
                            </SidebarButton>
                        </div>
                    )
                    :
                    ("")
                }

                
                <div className="sidebar__ImgSection">
                    <img 
                    alt="profile"
                    src={user.avatarSrc}
                    // src="https://static.thenounproject.com/png/363640-200.png"
                    // src="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                    className="sidebar__img"
                    />
                </div>
                
                <div className="sidebar__lower">
                    <div className="sidebar__midSection">

                        <SidebarButton 
                            // variant="outlined"
                            color="secondary" 
                            fullWidth
                            onClick={() => { history.push("/profile") } }
                            startIcon={<AccountBoxIcon />}
                        >
                            Profile
                        </SidebarButton>

                        <SidebarButton
                            color="secondary" 
                            fullWidth
                            onClick={ () => { history.push("/feeds") } }
                            startIcon={<PhotoLibraryIcon />}
                        >
                            Feeds
                        </SidebarButton>

                        <SidebarButton
                            color="secondary" 
                            fullWidth
                            onClick={() => { history.push("/chat") }}
                            startIcon={<ForumIcon />}
                        >
                            Chat
                        </SidebarButton>

                        {/* <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={() => { history.push("/signin") } }
                            startIcon={<NotificationsActiveIcon />}
                        >
                            Notifications
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<WidgetsIcon />}
                        >
                            Explore
                        </SidebarButton> */}

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={() => { history.push("/videocall") }}
                            startIcon={<VideoCallIcon />}
                        >
                            Video Call
                        </SidebarButton>
                
                    </div>

                    <div className="sidebar__bottom">
                        <SidebarButton
                            disableElevation
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {setIsUploadCompVisible(true)}}
                            startIcon={<PublishIcon />}
                        >
                            Upload
                        </SidebarButton>
                    </div>
                </div>

            </div>
        )
    }

    // for uploading functionality
    const handleCloseUploadComp = () => {
        setIsUploadCompVisible(false);
        setImagePreviewSrc(null);
    }

    const handleFileChange = (e) => {
        if(e.target.files[0]) {
            // setting for previewing images
            let newSrc = URL.createObjectURL(e.target.files[0])
            setImagePreviewSrc(newSrc);

            // setting for uploading image object
            setImageToBeUploaded(e.target.files[0]);

            
        }
    }

    const handleFeedUpload = (e) => {
        e.preventDefault();

        // uploading image
        const uploadTask = storage.ref(`images/${imageToBeUploaded.name}`).put(imageToBeUploaded);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ...
                const progress = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes)* 100);
                setProgress(progress);
            },
            (error) => {
                // error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                // on upload completion ...
                storage
                    .ref("images")
                    .child(imageToBeUploaded.name)
                    .getDownloadURL()
                    .then(url => {
                        // now you can save image url inside database
                        // console.log(url);
                        
                        // console.log(authToken);

                        fetch(`${BASE_URL}/secured/upload`, {
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "auth-token": authToken
                            },
                            body: JSON.stringify({
                                postSrc: url,
                                avatarSrc: user.avatarSrc,
                                caption: caption,
                                email: user.email,
                            }) 

                        })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res)

                            if(res.message === "uploadedSuccessfully") {
                                
                                socketForFeedUpload.emit("new-feed-uploaded-successfully")

                            }
                            // emitting event on socket
                        })
                        .catch(err => alert(err))

                        // resetting back to default
                        setProgress(0);
                        setImagePreviewSrc(null);
                        setImageToBeUploaded(null);
                        setCaption("");
                    })
            }
        )

    }


    return (
        <div className="sidebar">


            {
                screenSize <= "500" 
                ?
                (
                    <div className="sidebar__menu">

                        <Button
                            disableElevation
                            color="secondary"
                            onClick={toggleSmallScreenSidebar}
                        >
                            <MenuIcon style={{ fontSize: 40 }} />
                        </Button>
                        

                        <div className="sidebar__logo">
                            <img 
                                alt="logo"
                                src="https://firebasestorage.googleapis.com/v0/b/social-media-d971a.appspot.com/o/project-files%2FWhatsApp%20Image%202020-10-25%20at%201.37.55%20AM.jpeg?alt=media&token=7571f083-2b1b-4072-b277-ac928226635c"
                                // src="https://www.freelogodesign.org/file/app/client/thumb/edbfd12a-30f8-44cb-863e-5ded84c169fc_200x200.png?1601360986964"
                            />

                        </div>

                    </div>

                    
                )
                : 
                ( sidebarJsx()  )       
        

                
            }

            {
                isSidebarToggled
                ?
                ( sidebarJsx() )
                :
                ("")
            }

            {
                isUploadCompVisible
                ?
                (
                    // upload system using full screen overlay layout

                    <FullScreenOverlayLayout handleCloseFunc={handleCloseUploadComp}>
                        <form className="sidebar__upload"  onSubmit={(e) => handleFeedUpload(e)}>

                            <div className="sidebar__upload__formFields">
                                <LinearProgress color="secondary" thickness={1} variant="determinate" value={progress} max="100" />
                            </div>

                            <div className="sidebar__upload__formFields">
                                <TextField
                                    value={caption}
                                    label="Caption"
                                    type="text"
                                    onChange={(e) => { setCaption(e.target.value) }}
                                    fullWidth
                                />
                            </div>

                            {
                                imagePreviewSrc
                                ?
                                (
                                    <div className="sidebar__upload__formFields">
                                        <img 
                                            alt="post to be uploaded"
                                            src={imagePreviewSrc}
                                            width="200"
                                            height="200"
                                        />
                                    </div>
                                )
                                :
                                (
                                    <div className="sidebar__upload__formFields">
                                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
                                    </div> 
                                )
                            }

                            <div className="sidebar__upload__formFields">
                                <MyBasicButton
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={(e) => handleFeedUpload(e)}
                                >
                                    Upload Post
                                </MyBasicButton>
                            </div>
                        </form>
                    </FullScreenOverlayLayout>
                    
                )
                :
                ("")
            }
            
        
        </div>
    )
}

export default Sidebar;


// logo image url 
//  https://www.freelogodesign.org/file/app/client/thumb/edbfd12a-30f8-44cb-863e-5ded84c169fc_200x200.png?1601360986964