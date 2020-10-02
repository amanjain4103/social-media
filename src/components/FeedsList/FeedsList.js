import React from 'react';
import "./FeedsList.css";
import FeedCard from "../FeedCard/FeedCard";

function FeedsList() {
    return (
        <div className="feedslist">
            <FeedCard 
                username="Aman"
                avatarSrc="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                postSrc="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                likes={12}
                caption="this is a test caption but th efunction is amazing"
                comments={[{user:"Aman jain",comment:"nice post"}]}
                isLiked={false}
            />

            <FeedCard 
                username="Aman"
                avatarSrc="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                postSrc="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                likes={12}
                caption="this is a test caption but th efunction is amazing"
                comments={[{user:"Aman jain",comment:"nice post"}]}
                isLiked={false}
            />

            <FeedCard 
                username="Aman"
                avatarSrc="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                postSrc="https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg"
                likes={12}
                caption="this is a test caption but th efunction is amazing"
                comments={[{user:"Aman jain",comment:"nice post"}]}
                isLiked={false}
            />

            
        </div>
    )
}

export default FeedsList
