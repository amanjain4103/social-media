import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {MyBasicButton} from "../Buttons/Buttons";
import "./SignIn.css";
import { validateEmail, validatePassword } from '../../validator';
import {useHistory} from "react-router-dom";
import { useStateValue } from '../../StateProvider';

  

const SignIn = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const BASE_URL = process.env.REACT_APP_BASE_URL; //exposed by react already I am just using it
    const [, dispatch] = useStateValue();
    
    //email validation
    const handleEmail = (e) => {
        
        setEmail(e.target.value);

        if(validateEmail(e.target.value)) {
            setEmailError("");
        }else {
            setEmailError("Check your Email");
        }
    }

    //password validation
    const handlePassword = (e) => {
    
        setPassword(e.target.value);

        if(validatePassword(e.target.value)) {
            setPasswordError("");
        }else {
            setPasswordError("Check your Password");
        }

    }

    // handeling signin
    const handleSignin = (e) => {
        
        e.preventDefault();
        
        fetch(`${BASE_URL}/users/signin`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email":email,
                "password":password
            })
        })
        .then(res => res.json())
        .then(res => {

            if(res.authToken) {
                // means that user is verified and have recieved the token

                // console.log(res);
                dispatch({
                    type:"SET_USER",
                    payload:{
                        firstName:res.firstName,
                        lastName: res.lastName,
                        email: res.email,
                        avatarSrc: res.avatarSrc,
                        numberOfPosts: res.numberOfPosts,
                        numberOfLikes: res.numberOfLikes,
                        authToken: res.authToken
                    }
                })
                // waiting for state to be set so that feeds route will be available
                setTimeout(()=> { history.push("/feeds") },500);
                
            }
            else {
                alert(res.message);
            }
        })
        .catch(err => {
            console.log(err)
        })

    }



    return (
        <div className="signin">
            <div className="signin__container">

                <div className="signin__form">

                    <div className="signin__logo">
                        <img 
                            alt="Social Media"
                            src="https://firebasestorage.googleapis.com/v0/b/social-media-d971a.appspot.com/o/project-files%2FWhatsApp%20Image%202020-10-25%20at%201.37.55%20AM.jpeg?alt=media&token=7571f083-2b1b-4072-b277-ac928226635c"
                            height="100"
                        />
                    </div>
                    

                    <form autoComplete="off">
                        <div className="signin__formFields">
                            <TextField
                                value={email}
                                variant="outlined"
                                label="Email Address"
                                type="email"
                                error={emailError.trim() !==""}
                                onChange={(e) => handleEmail(e)}
                                fullWidth
                            />
                        </div>

                        

                        <div className="signin__formFields">
                            
                            <TextField
                                label="Your Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                error={passwordError.trim() !==""}
                                onChange={(e) => handlePassword(e)}
                                fullWidth
                            />

                        </div>

                        <div className="signin__formFields">
                            <MyBasicButton 
                              variant="contained" 
                              color="secondary" 
                              fullWidth
                              onClick={(e) => handleSignin(e)}
                            >
                               signin
                            </MyBasicButton>
                        </div>
                        
                        <br />
                        <hr />
                        <br />

                        <div className="signin_formFields">
                            Don't have an account yet ! &nbsp; <a href="#" onClick={()=>history.push("/signup")}>Sign Up</a> 
                        </div>

                        
                        <br />
                    </form>
                </div>
            </div>


        </div>
    )
}

export default SignIn;
