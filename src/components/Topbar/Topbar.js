import React from 'react';
import "./Topbar.css";
import { useStateValue } from '../../StateProvider';
import {useHistory} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CodeIcon from '@material-ui/icons/Code';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Button } from '@material-ui/core';


  

function Topbar() {

  const [{user},] = useStateValue();
  const history = useHistory();

    return (
        <div className="topbar">
            
            <div className="topbar__logo">
                
                <img 
                    alt="Social Media"
                    src="https://firebasestorage.googleapis.com/v0/b/social-media-d971a.appspot.com/o/project-files%2FWhatsApp%20Image%202020-10-25%20at%201.37.55%20AM.jpeg?alt=media&token=7571f083-2b1b-4072-b277-ac928226635c"
                />
            </div>

            <div className="topbar__section">

                <Button
                    disableElevation
                    color="secondary"
                    startIcon={<CreditCardIcon style={{ fontSize: 20 }} />}
                >
                    Try Premium
                </Button>

                <Button
                    color="secondary"
                    startIcon={<CodeIcon style={{ fontSize: 20 }} />}
                >
                    <a href="https://www.linkedin.com/in/aman-jain-dev/" target="__blank">Hire Dev</a>
                </Button>

                <Button
                    disableElevation
                    color="secondary"
                    startIcon={<AccountBoxIcon style={{ fontSize: 20 }} />}
                    onClick={() => { history.push("/profile") }}
                >
                    {user.firstName} {user.lastName}
                </Button>           

            </div>

             

            
        
        </div>
    )
}

export default Topbar;