import React, { useEffect,useState } from 'react';
import "./FeedsList.css";
import FeedCard from "../FeedCard/FeedCard";
import { useStateValue } from '../../StateProvider';

function FeedsList() {

    const [feeds,setFeeds] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL; //exposed by react already I am just using it
    const [{authToken},] = useStateValue();

    useEffect(() => {
        fetch(`${BASE_URL}/secured/feeds`, {
            headers: {
                "auth-token": authToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==="feedsFetchedSuccessfully") {
                setFeeds(res.feeds);
                console.log(res.feeds);
            }else {
                alert(res.message);
            }
        })
        .catch(err => alert(err))
    },[BASE_URL,authToken])

    return (
        <div className="feedslist">
            {
                feeds!==null
                ?
                (
                    <div>
                        {
                            feeds.map((feed) => {
                                return (
                                    <FeedCard
                                        key={feed.email+feed.avatarSrc+feed.postSrc} 
                                        username={feed.email}
                                        avatarSrc={feed.avatarSrc}
                                        postSrc={feed.postSrc}
                                        likes={feed.likes}
                                        caption={feed.caption}
                                        comments={feed.comments}
                                        isLiked={false}
                                    />
                                ) 
                            })
                        }
                    </div>    
                    
                )
                :
                ("")
            }
            

            {/* <FeedCard 
                username="Aman"
                avatarSrc="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                postSrc="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                likes={12}
                caption="this is a test caption but th efunction is amazing"
                comments={[{user:"Aman jain",comment:"nice post"}]}
                isLiked={false}
            /> */}

            
        </div>
    )
}

export default FeedsList;
