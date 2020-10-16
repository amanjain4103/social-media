import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import "./FeedCard.css";

const FeedCard = (props) =>  {

    const [isLiked,setIsLiked] = useState(false);
    const [howLikeStarted,setHowLikeStarted] = useState(false);
    const [numOfLikes,setNumOfLikes] = useState(props.likes.length);

    useEffect(() => {
        let temp = props.likes.filter((item)=> {
            return item===props.currentUserEmail
        })

        if(temp.length!=0) {
            setIsLiked(true);
            setHowLikeStarted(true);
        }


    }, [])

    useEffect(() => {
        if(howLikeStarted) {

            if(!isLiked) {
                // extra if because it is giving negtive when hit first time
                if(numOfLikes!==0) {
                    setNumOfLikes((numOfLikes)=> (--numOfLikes))
                }
            }else {
                setNumOfLikes((numOfLikes)=> (++numOfLikes))
            }
        }else {
            if(isLiked) {
                setNumOfLikes((numOfLikes)=> (++numOfLikes))
            }else {
                if(numOfLikes!==0) {
                    setNumOfLikes((numOfLikes)=> (--numOfLikes))
                } 
            }
        }
    },[isLiked])

    useEffect(() => {

        // this is only for un mounting and adding likes to db
            return () => {
                console.log("unmount")
                // now manipulate db to add and remove likes then do fetch from here
                if(howLikeStarted == isLiked) {
                    // no need to manipulate db
                }else {
                    if(howLikeStarted) {
    
                        // pop the current user from likes array in database
                        fetch(`${props.BASE_URL}/secured/likes`, {
                            method: "PUT",
                            headers: {
                                "Content-Type":"application/json",
                                "auth-token": props.authToken
                            },
                            body:JSON.stringify({
                                "likeToBeAdded":false,
                                "feedId":props.id,
                                "emailToBeManipulated":props.currentUserEmail
                            })
                        })
                        .then(res=> res.json())
                        .then(res => {
                            if(res.message === "likeDeletedSuccessfully") {
                                // no problem all done 
                            }else {
                                alert(res.message);
                            }
                        })
                        .catch(err => {
                            alert("Some Error Occured on Your side!!!")
                        })
    
                    }else {
                        // push the current user to the likes array in db
                        fetch(`${props.BASE_URL}/secured/likes`, {
                            method: "PUT",
                            headers: {
                                "Content-Type":"application/json",
                                "auth-token": props.authToken
                            },
                            body:JSON.stringify({
                                "likeToBeAdded":true,
                                "feedId":props.id,
                                "emailToBeManipulated":props.currentUserEmail
                            })
                        })
                        .then(res=> res.json())
                        .then(res => {
                            if(res.message === "likeAddedSuccessfully") {
                                // no problem all done 
                            }else {
                                alert(res.message);
                            }
                        })
                        .catch(err => {
                            alert("Some Error Occured on Your side!!!")
                        })
    
                    }
                }
            }
        
    }, [isLiked,howLikeStarted])

    const handleLikeButton = () => {
        setIsLiked((isLiked)=> !isLiked)
    }

    return (
        <div className="feedCard">
            <div className="feedCard__top">
                <Avatar alt={props.username} src={props.avatarSrc} />
                &nbsp;&nbsp;&nbsp;
                <span className="feedCard__username">{props.username}</span>
                {/* avatar   ,  Username */}
            </div>

            <div className="feedCard__post">
                <img alt="post" src={props.postSrc} />
                {/* image */}
            </div>

            <div className="feedCard__bottom">
                
                <div className="feedCard__likeComment" >
                    <IconButton color={isLiked?"secondary":"primary"} onClick={handleLikeButton}>
                        <WhatshotIcon style={{ fontSize: 30 }} />
                    </IconButton>

                    <IconButton color="primary" >
                        <InsertCommentIcon style={{ fontSize: 30 }} />
                    </IconButton>
                </div>
                {/* like, comment=> toggle comment section */}

                <div className="feedCard__likeCaption">
                    <span>{numOfLikes}</span> likes
                    <p className="feedCard__caption">{props.caption}</p>
                </div>
                {/* number of likes */}

                {/* caption */}

                <form className="feedCard__addComment">
                    <input placeholder="write comment" type="text" />
                    
                    <Button
                        disableElevation
                        color="secondary"
                        // type="submit"
                        // onClick={postThisComment}
                    >
                        post
                    </Button>

                </form>
                {/* comment input field and button  */}

            </div>
        </div>
    )
}

export default FeedCard
