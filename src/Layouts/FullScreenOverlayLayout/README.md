## How to use Full Screen Overlay Layout

### use like this in main component

```
const [showPopup, setShowPopup] = useState(false);

const handleOpenPopup = () => {
    setShowPopup(true);
}

const handleClosePopup = () => {
    setShowPopup(false);
}

{
    showPopup
    ?
    (
        <FullScreenOverlayLayout handleCloseFunc={handleClosePopup}>
            <h2>hello world from mom</h2> 
            <!-- add whatever you want as content buttons and anything -->
        </FullScreenOverlayLayout>
    )
    :
    ("")
}

```