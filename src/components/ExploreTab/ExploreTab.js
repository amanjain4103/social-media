import React from 'react';
import "./ExploreTab.css";
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import { SidebarButton } from '../Buttons/Buttons';

function ExploreTab() {
    return (
        <div className="exploreTab">
            
            <div className="exploreTab__header">
                <h2>Explore More</h2>
            </div>
            {/* header */}

            <div className="exploreTab__hashtagContainer">
                <SidebarButton 
                    color="secondary" 
                    fullWidth
                    // onClick={handleProfile}
                    startIcon={<LabelImportantIcon />}
                >
                    Comedy
                </SidebarButton>

                <SidebarButton 
                    color="secondary" 
                    fullWidth
                    // onClick={handleProfile}
                    startIcon={<LabelImportantIcon />}
                >
                    Hackathon
                </SidebarButton>

                <SidebarButton 
                    color="secondary" 
                    fullWidth
                    // onClick={handleProfile}
                    startIcon={<LabelImportantIcon />}
                >
                    superstar
                </SidebarButton>

                <SidebarButton 
                    color="secondary" 
                    fullWidth
                    // onClick={handleProfile}
                    startIcon={<LabelImportantIcon />}
                >
                    fitness
                </SidebarButton>


            </div>

            {/* hastag1 */}
            {/* hastag 2 */}
        </div>
    )
}

export default ExploreTab
