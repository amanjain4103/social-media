import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import "./FeedCard.css";

const FeedCard = (props) =>  {
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
                    <WhatshotIcon style={{ fontSize: 30 }} />
                    <InsertCommentIcon style={{ fontSize: 30 }} />
                </div>
                {/* like, comment=> toggle comment section */}

                <div className="feedCard__likeCaption">
                    <span>{props.likes}</span> likes
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
