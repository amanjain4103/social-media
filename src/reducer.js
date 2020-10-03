
//preparing reducer
export const initialState = {
    email: "",
    authToken: "",
    sayHello:"hello world"
}

export const reducer = (state, action) => {
    switch(action) {
        case "SOMETHING": 
            return state;
        default: 
            return state;
    }
}

export default reducer;
