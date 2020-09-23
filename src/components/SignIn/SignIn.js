import React from 'react';
import TextField from '@material-ui/core/TextField';
import {SignInButton} from "../Buttons/Buttons";
import "./SignIn.css";

  

const SignIn = () => {

    return (
        <div className="signin">
            <div className="signin__container">

                <div className="signin__form">

                    <div className="signin__logo">
                        <h1>Social Media</h1>
                    </div>

                    <form noValidate autoComplete="off">
                        <div className="signin__formFields">
                            <TextField
                                autoFocus
                                variant="outlined"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                        </div>

                        <div className="signin__formFields">
                            <TextField
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth
                            />
                        </div>

                        <div className="signin__formFields">
                            <SignInButton variant="contained" color="secondary" fullWidth>signin</SignInButton>
                        </div>
                        
                        <br />
                        <hr />
                        <br />

                        <div className="signin_formFields">
                            Don't have an account yet ! &nbsp; <a href="#">Sign Up</a> 
                        </div>

                        
                        <br />
                    </form>
                </div>
            </div>


        </div>
    )
}

export default SignIn;
