import React from "react";
import "./Profile.css";
import WithSidebarLayout from "../../Layouts/WithSidebarLayout/WithSidebarLayout";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MyPostList from "../MyPostList/MyPostList";

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));

const Profile = () => {

    const classes = useStyles();

    return ( 
        <WithSidebarLayout>
            <div className="profile"> {/*make it scrollable*/}
                <div className="profile__top">

                    <div className="profile__top__left">
                        <img 
                            alt="profile"
                            src="https://instagram.fjdh1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjdh1-1.fna.fbcdn.net&_nc_ohc=HBXNFvtAPKYAX8gyFWn&oh=1e572e8194718147d9f85c3d29ae7bef&oe=5FA692E2"
                        />

                        {/* file upload system */}
                        <form action="fileupload" method="post" enctype="multipart/form-data">
                            <p>Upload New Profile Pic</p>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button type="submit" variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </form>

                    </div>

                    <div className="profile__top__right">
                        <div className="profile__top__right__section">
                            <h2>akku@gmail.com </h2>
                            <Button
                            //   variant="outlined"
                              color="secondary"
                            >
                                Logout
                            </Button>
                        </div>

                        <div className="profile__top__right__section">
                            <p>11 <strong>posts</strong></p>
                            <p>777 <strong>Likes</strong></p>

                        </div>

                        <div className="profile__top__right__section">
                            <h3>Akanksha Pandey</h3>
                        </div>

                    </div>
                </div> 

                <div className="profile__bottom">
                    <h2>Posts</h2>
                    <MyPostList />
                </div>
            </div>
        </WithSidebarLayout>
    )
}

export default Profile;