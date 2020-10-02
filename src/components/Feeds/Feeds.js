import React from 'react'
import "./Feeds.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from '../Topbar/Topbar';
import FeedsList from '../FeedsList/FeedsList';
import ExploreTab from '../ExploreTab/ExploreTab';

function Feeds() {
    return (
        <div className="feeds">
            
            <Sidebar />

            <div className="feeds__rightContainer">
                <div className="feeds__right__topbar">
                    <Topbar />
                </div>

                <div className="feeds__right__bottombar">
                    <div className="feeds__allfeeds">
                        <FeedsList />
                    </div>
                    
                    <div className="feeds__explore">
                        <ExploreTab />
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Feeds
