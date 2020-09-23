import React from 'react'
import "./Home.css";
import { useStateValue } from "./state";


function Home() {

    // this is how to use global state now
    const [state, dispatch] = useStateValue();

    return (
        <div>
            Home
        </div>
    )
}

export default Home
