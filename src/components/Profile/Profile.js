import React, {useEffect,useState} from "react";
import "./Profile.css";
import WithSidebarLayout from "../../Layouts/WithSidebarLayout/WithSidebarLayout";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MyPostList from "../MyPostList/MyPostList";
import { useStateValue } from "../../StateProvider";

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));


// already exposed by react
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Profile = (props) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(null);
    const [postsForRenderingOnProile, setPostsForRenderingOnProile] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {

        let emailToBeViewed = props.email;
        if(!props.email) {
            emailToBeViewed = user.email;
        }

        fetch(`${BASE_URL}/users/getuser/?email=${props.email}`)
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
    },[])

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
                        <form action="fileupload" method="post" encType="multipart/form-data">
                            <p>Upload New Profile Pic</p>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Upload
                                </Button>
                            </label>
                        </form>

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
            </div>
        </WithSidebarLayout>
    )
}

export default Profile;