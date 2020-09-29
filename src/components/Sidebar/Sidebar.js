import React, {useEffect,useState} from 'react';
import { SidebarButton } from '../Buttons/Buttons';
import {Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ForumIcon from '@material-ui/icons/Forum';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import WidgetsIcon from '@material-ui/icons/Widgets';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import "./Sidebar.css";


function Sidebar() {

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);

    const handleProfile = () => {

    }

    const toggleSmallScreenSidebar = () => {
        setIsSidebarToggled((prevCondition) => (!prevCondition))
    }

    useEffect(() => {
        window.addEventListener("resize", () => { 
                console.log(window.innerWidth); 
                setScreenSize(window.innerWidth);
            } 
        );
      
        return (() => {
            // window.removeEventListener("resize");
        })

    },[])


    const sidebarJsx =() => {
        return (
            <div className="sidebar__container">
                
                {
                    isSidebarToggled
                    ?
                    (
                        <div className="sidebar__upper">
                            <SidebarButton
                                variant="contained"
                                color="primary" 
                                fullWidth
                                onClick={toggleSmallScreenSidebar}
                                startIcon={<MenuOpenIcon style={{ fontSize: 40 }} />}
                            >
                                go back
                            </SidebarButton>
                        </div>
                    )
                    :
                    ("")
                }

                

                <div className="sidebar__ImgSection">
                    <img 
                    alt="profile"
                    src="https://instagram.fjai1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/95205316_245179196540438_1810417303259447296_n.jpg?_nc_ht=instagram.fjai1-1.fna.fbcdn.net&_nc_ohc=0-MdrDqZwI4AX_arLlU&oh=07bce87acc9055af5b2b7c667cc413b4&oe=5F9AB562"
                    className="sidebar__img"
                    />
                </div>
                
                <div className="sidebar__lower">
                    <div className="sidebar__midSection">

                        <SidebarButton 
                            // variant="outlined"
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<AccountBoxIcon />}
                        >
                            Profile
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<PhotoLibraryIcon />}
                        >
                            Feeds
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<ForumIcon />}
                        >
                            Chat
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<NotificationsActiveIcon />}
                        >
                            Notifications
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<WidgetsIcon />}
                        >
                            Explore
                        </SidebarButton>

                        <SidebarButton
                            // variant="outlined" 
                            color="secondary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<VideoCallIcon />}
                        >
                            Video Call
                        </SidebarButton>
                
                    </div>

                    <div className="sidebar__bottom">
                        <SidebarButton
                            disableElevation
                            variant="contained"
                            color="primary" 
                            fullWidth
                            onClick={handleProfile}
                            startIcon={<DeveloperModeIcon />}
                        >
                            Developer
                        </SidebarButton>
                    </div>
                </div>

                {/* developer btn */}
            </div>
        )
    }

    return (
        <div className="sidebar">


            {
                screenSize <= "500" 
                ?
                (
                    <div className="sidebar__menu">

                        <Button
                            disableElevation
                            color="secondary"
                            onClick={toggleSmallScreenSidebar}
                        >
                            <MenuIcon style={{ fontSize: 40 }} />
                        </Button>
                        

                        <div className="sidebar__logo">
                            <img 
                                alt="logo"
                                src="https://www.freelogodesign.org/file/app/client/thumb/edbfd12a-30f8-44cb-863e-5ded84c169fc_200x200.png?1601360986964"
                            />

                        </div>

                    </div>

                    
                )
                : 
                ( sidebarJsx()  )       
        

                
            }

            {
                isSidebarToggled
                ?
                ( sidebarJsx() )
                :
                ("")
            }

            
        
        </div>
    )
}

export default Sidebar;


// logo image url 
//  https://www.freelogodesign.org/file/app/client/thumb/edbfd12a-30f8-44cb-863e-5ded84c169fc_200x200.png?1601360986964