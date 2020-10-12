import React from 'react';
import "./FullScreenOverlayLayout.css";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import IconButton from '@material-ui/core/IconButton';


const FullScreenOverlayLayout = (props) => {

    return (
        <div className="fullscreenoverlaylayout">
            <div className="fullscreenoverlaylayout__close">
                <IconButton color="secondary" onClick={props.handleCloseFunc}>
                    <CancelOutlinedIcon style={{ fontSize: 40 }} />
                </IconButton>
            </div>

            <div className="fullscreenoverlaylayout__main">
                {props.children}
            </div>



            
        </div>
    )
}

export default FullScreenOverlayLayout;