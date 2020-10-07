import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import "./WithSidebarLayout.css";

const WithSidebarLayout = (props) => {
    return (
        <div className="withsidebarlayout">
            
            <Sidebar />

            <div className="withsidebarlayout__rightContainer">
                            
                {props.children}

            </div>
        </div>
    )
}

export default WithSidebarLayout;