import React, { useEffect,useState } from 'react';
import "./FeedsList.css";
import FeedCard from "../FeedCard/FeedCard";
import { useStateValue } from '../../StateProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

function FeedsList() {

    const [feeds,setFeeds] = useState(null);
    const BASE_URL = process.env.REACT_APP_BASE_URL; //exposed by react already I am just using it
    const [{user, authToken, newFeedCount},] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);

    // updating my feeds when someone just upload a new feed when I am online
    // useEffect(() => {
    //     // console.log(state.newFeed);

    //     let doesNewFeedArrives = false;
    //     if(typeof newFeedCount !== undefined && newFeedCount!== null) {
    //         doesNewFeedArrives = Object.keys(newFeed).length === 0 ? false: true;
    //     }
    //     console.log(doesNewFeedArrives)

    // }, [newFeedCount])

    useEffect(() => {

        setIsLoading(true);
        fetch(`${BASE_URL}/secured/feeds`, {
            headers: {
                "auth-token": authToken
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.message==="feedsFetchedSuccessfully") {
                setFeeds(res.feeds);
                setIsLoading(false);
                // console.log(newFeedCount);
                // console.log(res.feeds);
                
            }else {
                alert(res.message);
            }
        })
        .catch(err => alert(err))
    },[BASE_URL,authToken,newFeedCount])

    return (
        <>
            {
                isLoading
                ?
                (
                    <CircularProgress />
                )
                :
                (

                    <div className="feedslist">
                        {
                            feeds!==null
                            ?
                            (
                                <>
                                    {
                                        feeds.map((feed,index) => {

                                            feed = feeds[feeds.length - 1 - index];
                                            
                                            return (
                                                <FeedCard
                                                    key={feed._id} 
                                                    id={feed._id}
                                                    username={feed.email}
                                                    avatarSrc={feed.avatarSrc}
                                                    postSrc={feed.postSrc}
                                                    likes={feed.likes}
                                                    caption={feed.caption}
                                                    comments={feed.comments}
                                                    isLiked={false}
                                                    currentUserEmail={user.email}
                                                    authToken={authToken}
                                                    BASE_URL={BASE_URL}
                                                />
                                            ) 
                                        })
                                    }
                                </>    
                                
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
        </>

        
    )
}

export default FeedsList;
