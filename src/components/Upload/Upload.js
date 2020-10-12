import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import FullScreenOverlayLayout from '../../Layouts/FullScreenOverlayLayout/FullScreenOverlayLayout';

function Upload() {

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(true);
        return () => {
            setShowPopup(false);
        }
    }, [])

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const handleUpload = (e) => {
        e.preventDefault();

        console.log("hello")
    }


    return (
        <div>
            {
                showPopup
                ?
                (
                    <FullScreenOverlayLayout handleCloseFunc={handleClosePopup}>
                        <form onSubmit={(e) => handleUpload(e)}>
                            <div className="upload__formFields">
                                <TextField
                                    // value={email}
                                    // variant="outlined"
                                    label="Caption"
                                    type="text"
                                    // error={emailError.trim() !==""}
                                    // onChange={(e) => handleEmail(e)}
                                    fullWidth
                                />
                            </div>
                        </form>
                    </FullScreenOverlayLayout>
                )
                :
                ("")
            }
        </div>
    )
}

export default Upload
