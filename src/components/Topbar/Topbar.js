import React from 'react';
import "./Topbar.css";
import { Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {MySimpleButton} from "../Buttons/Buttons";

  

function Topbar() {

    const handleSearchField = (e) => {

    }

    return (
        <div className="topbar">
            
            <form className="topbar__search">
                <TextField
                    variant="outlined"
                    label="Search"
                    type="text"
                    size="small"
                    onChange={(e) => handleSearchField(e)}
                />
                &nbsp;&nbsp;
                <MySimpleButton
                    disableElevation
                    variant="contained"
                    color="primary"
                    // type="submit"
                    // onClick={toggleSmallScreenSidebar}
                    startIcon={<SearchIcon style={{ fontSize: 20 }} />}
                >
                    Search
                </MySimpleButton>

            </form>

            <div className="topbar__logo">
                <img 
                    alt="logo"
                    src="https://www.freelogodesign.org/file/app/client/thumb/edbfd12a-30f8-44cb-863e-5ded84c169fc_200x200.png?1601360986964"
                />
            </div>
        
        </div>
    )
}

export default Topbar
