import React, {useEffect,useState} from "react";
import "./Profile.css";
import {Button, LinearProgress, TextField} from "@material-ui/core";
import { MyBasicButton } from '../Buttons/Buttons';
import WithSidebarLayout from "../../Layouts/WithSidebarLayout/WithSidebarLayout";
import { makeStyles } from '@material-ui/core/styles';
import MyPostList from "../MyPostList/MyPostList";
import { useStateValue } from "../../StateProvider";
import {useHistory} from "react-router-dom";
import FullScreenOverlayLayout from '../../Layouts/FullScreenOverlayLayout/FullScreenOverlayLayout';
import storage from "../../firebase.js"


const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));


// already exposed by react
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [postsForRenderingOnProile, setPostsForRenderingOnProile] = useState([]);
    const [{user,authToken}, ] = useStateValue();

    // for upload functionality
    const [ isUploadCompVisible, setIsUploadCompVisible] = useState(false);
    const [imagePreviewSrc, setImagePreviewSrc] = useState(null);
    const [imageToBeUploaded,setImageToBeUploaded] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {

        let emailToBeViewed = props.email;
        if(!props.email) {
            emailToBeViewed = user.email;
        }

        fetch(`${BASE_URL}/users/getuser/?email=${emailToBeViewed}`)
        .then((res)=> res.json())
        .then((res)=> {

            if(res.message ==="userDataFound") {
                setCurrentUser({
                    "firstName": res.firstName,
                    "lastName": res.lastName,
                    "username": res.email,
                    "avatarSrc": res.avatarSrc,
                    "numberOfPosts": res.numberOfPosts,
                    "numberOfLikes": res.numberOfLikes
                })
            }else {
                alert(res.message);
            }

            setPostsForRenderingOnProile(res.posts.map(item => item.postSrc));

            console.log(res);
            console.log(postsForRenderingOnProile);
        })
        .catch( (err) => {
            alert(err)
        })
    },[props.email,user.email])

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

    const handleProfilePicUpload = (e) => {
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
                        console.log(url);
                        
                        console.log(authToken);

                        fetch(`${BASE_URL}/secured/upload-profile-avatar`, {
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "auth-token": authToken
                            },
                            body: JSON.stringify({
                                "avatarSrc": url
                            })
                            

                        })
                        .then(res => res.json())
                        .then(res => alert(res.message))
                        .catch(err => alert(err))

                        // resetting back to default
                        setProgress(0);
                        setImagePreviewSrc(null);
                        setImageToBeUploaded(null);
                    })
            }
        )

    }


    return ( 
        <WithSidebarLayout>
            <div className="profile"> {/*make it scrollable*/}
                <div className="profile__top">

                    <div className="profile__top__left">
                        <img 
                            alt="profile"
                            src={currentUser?.avatarSrc}
                        />

                        {/* file upload system */}
                        <div className="profile__top__left__uploadButton">
                            <p>Upload new profile pic</p>
                            <Button color="primary" variant="contained" fullWidth onClick={() => {setIsUploadCompVisible(true)}}>
                                Upload
                            </Button>
                        </div>

                    </div>

                    <div className="profile__top__right">
                        <div className="profile__top__right__section">
                            <h2>{currentUser?.username}</h2>
                            <Button
                            //   variant="outlined"
                              color="secondary"
                            >
                                Logout
                            </Button>
                        </div>

                        <div className="profile__top__right__section">
                            <p>{currentUser?.numberOfPosts} <strong>posts</strong></p>
                            <p>{currentUser?.numberOfLikes} <strong>Likes</strong></p>

                        </div>

                        <div className="profile__top__right__section">
                            <h3>{currentUser?.firstName + " " + currentUser?.lastName}</h3>
                        </div>

                    </div>
                </div> 

                <div className="profile__bottom">
                    <h2>Posts</h2>
                    <MyPostList postsToBeShown={postsForRenderingOnProile} />
                </div>

                {   
                    // upload popup component
                    isUploadCompVisible
                    ?
                    (
                        // upload system using full screen overlay layout

                        <FullScreenOverlayLayout handleCloseFunc={handleCloseUploadComp}>
                            <form className="sidebar__upload"  onSubmit={(e) => handleProfilePicUpload(e)}>

                                <div className="sidebar__upload__formFields">
                                    <LinearProgress color="primary" variant="determinate" value={progress} max="100" />
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
                                        type="submit"
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
        </WithSidebarLayout>
    )
}

export default Profile;