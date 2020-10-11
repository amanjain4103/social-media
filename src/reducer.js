
//preparing reducer
export const initialState = {
    email: "",
    authToken: "",
    sayHello:"hello world",
    user:{},
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
                }
            }
        
        
        default: 
            return state;
        
    }
}

export default reducer;
