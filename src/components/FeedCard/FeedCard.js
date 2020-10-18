import { Avatar, Button, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import "./FeedCard.css";

const FeedCard = (props) =>  {

    const [isLiked,setIsLiked] = useState(false);
    const [howLikeStarted,setHowLikeStarted] = useState(false);
    const [numOfLikes,setNumOfLikes] = useState(props.likes.length);
    const [areCommentsHidden,setAreCommentsHidden] = useState(true);
    const [comments,setComments] = useState(props.comments)
    const [currentCommentMessage, setCurrentCommentMessage] = useState("");
    const initialLikes = props.likes.length;
    const manipulateLikeToDB = (likeToBeAdded) => {
        
        fetch(`${props.BASE_URL}/secured/likes`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "auth-token": props.authToken
            },
            body:JSON.stringify({
                "likeToBeAdded":likeToBeAdded, //likeToBeAdded => true/false
                "feedId":props.id,
                "emailToBeManipulated":props.currentUserEmail
            })
        })
        .then(res=> res.json())
        .then(res => {
            console.log(res.message);
            if(res.message === "likeAddedSuccessfully") {
                // no problem all done 
            }else if(res.message === "likeDeletedSuccessfully") {
                // no problem all done 
            }else {
                alert(res.message);
            }
        })
        .catch(err => {
            alert("Some Error Occured on Your side!!!")
        })
    }

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
                    manipulateLikeToDB(false);
                }
            }else {

                if( numOfLikes < initialLikes ) {
                    setNumOfLikes((numOfLikes)=> (++numOfLikes))
                    manipulateLikeToDB(true);
                }
                
            }
        }else {
            if(isLiked) {
                setNumOfLikes((numOfLikes)=> (++numOfLikes))
                manipulateLikeToDB(true);
            }else {
                if(numOfLikes!==0) {
                    if( numOfLikes > initialLikes ) {
                        setNumOfLikes((numOfLikes)=> (--numOfLikes))
                        manipulateLikeToDB(false);
                    }
                } 
            }
        }

    },[isLiked])

    const handleLikeButton = () => {
        setIsLiked((isLiked)=> !isLiked)
    }

    const handleCommentsButton = () => {
        setAreCommentsHidden((areCommentsHidden)=> !areCommentsHidden)
    }

    const addComment = (e) => {
        e.preventDefault();
                
        fetch(`${props.BASE_URL}/secured/add-comment`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "auth-token":props.authToken
            },
            body: JSON.stringify({
                "feedId":props.id,
                "email":props.currentUserEmail,
                "message":currentCommentMessage
            })
            
        })
        .then((res) => res.json())
        .then(res => {

            if(res.message === "commentAddedSuccessfully") {
                setComments((comments) => [...comments, {"email":props.currentUserEmail,"message":currentCommentMessage}]) 
                setCurrentCommentMessage("");
            }
        })
        .catch((err) => {
            alert("Check your Internet Connection!!!")
        })
        

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

                    <IconButton color={areCommentsHidden?"primary":"secondary"}  onClick={handleCommentsButton} >
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

                {
                    areCommentsHidden
                    ?
                    ("")
                    :
                    (
                        <div className="feedCard__comments">
                            
                            {
                                comments?.map((comment,index) => {
                                    return (
                                        <div key={index} className="feedCard__comments__commentItem">
                                            <strong>{comment.email}</strong> &nbsp; {comment.message}
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    )
                }
                

                <form className="feedCard__addComment" onSubmit={(e) => addComment(e)}>
                    <input placeholder="write comment" value={currentCommentMessage} type="text" onChange={(e) => setCurrentCommentMessage(e.target.value)} />
                    
                    <Button
                        disableElevation
                        color="secondary"
                        type="submit"
                        // onClick={addComment}
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
