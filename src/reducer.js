
//preparing reducer
export const initialState = {
    email: "",
    authToken: "",
    sayHello:"hello world",
    user:{},
    socket:null,
    newFeedCount:0,
    isVideoCallReceiver: false,
    wantToCloseReceiversVideoCallView: false
}

export const reducer = (state, action) => {
    switch(action.type) {
        case "SOMETHING": 
            return state;
        case "SET_USER":
            return {
                ...state,
                user:{
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    avatarSrc: action.payload.avatarSrc,
                    numberOfPosts: action.payload.numberOfPosts,
                    numberOfLikes: action.payload.numberOfLikes
                },
                authToken: action.payload.authToken
            }
        case "SET_NEW_FEED_COUNT":
            return {
                ...state,
                newFeedCount: state.newFeedCount + action.payload.newFeedCount
            }

        case "SET_IS_VIDEO_CALL_RECEIVER":
            return {
                ...state,
                isVideoCallReceiver: action.payload.isVideoCallReceiver
            }
        
        case "CLOSE_RECEIVERS_VIDEO_CALL_VIEW":
            return {
                ...state,
                wantToCloseReceiversVideoCallView: action.payload.wantToCloseReceiversVideoCallView
            }
        
        case "REMOVE_SOCKET":
            // do stuff later
            return {
                ...state
            }
        
        default: 
            return state;
        
    }
}

export default reducer;
