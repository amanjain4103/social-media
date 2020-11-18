import React, {useEffect} from 'react'
import "./Feeds.css";
import Topbar from '../Topbar/Topbar';
import FeedsList from '../FeedsList/FeedsList';
// import ExploreTab from '../ExploreTab/ExploreTab';
import WithSidebarLayout from '../../Layouts/WithSidebarLayout/WithSidebarLayout';


function Feeds() {

    return (
        <WithSidebarLayout> 
            <div className="feeds__right__topbar">
                <Topbar />
            </div>

            <div className="feeds__right__bottombar">
                <div className="feeds__allfeeds">
                    <FeedsList />
                </div>
                
                {/* <div className="feeds__explore">
                    <ExploreTab />
                </div> */}
                
            </div>
        </WithSidebarLayout>
        // <div className="feeds">
            
        //     <Sidebar />

        //     <div className="feeds__rightContainer">
        //         <div className="feeds__right__topbar">
        //             <Topbar />
        //         </div>

        //         <div className="feeds__right__bottombar">
        //             <div className="feeds__allfeeds">
        //                 <FeedsList />
        //             </div>
                    
        //             <div className="feeds__explore">
        //                 <ExploreTab />
        //             </div>
                    
        //         </div>

        //     </div>
        // </div>
    )
}

export default Feeds
