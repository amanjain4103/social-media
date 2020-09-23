import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {SignUpButton} from "../Buttons/Buttons";
import "./SignUp.css";
import MuiPhoneNumber from "material-ui-phone-number";
import {validateEmail, validatePassword} from "../../validator"
import {useHistory} from "react-router-dom";


const SignUp = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");
    const [user, setUser] = useState(null);
    const [errorOnSignup, setErrorOnSignup] = useState([]);
    const [otp, setOtp] = useState("");

    const handlePhoneNumber = (value) => {
        //phone number is a string
        var num ="+" +  value.split("").map(num => {
            if(isNaN(parseInt(num))) { return "" } else { return parseInt(num) } } ).join("");
            
            // console.log(num)
            setPhoneNumber(num);
    }

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

    // first name and last name
    const handleFirstName = (e) => {
        
        setFirstName(e.target.value.trim());
        // console.log(firstName)
        
    }

    const handleLastName = (e) => {
        // if(e.target.value.trim() !== "") {
        setLastName(e.target.value.trim());
        // console.log(lastName)
        
    }

    // handle data on Signup
    const handleSignup = (e) => {
        e.preventDefault();

        let errors = [];

        if( firstName.trim() ==="") {
            errors.push("First Name must not be empty");
        }

        if( lastName.trim() ==="") {
            errors.push("Last Name must not be empty");
        }

        if(emailError.trim() !== "" || email.trim() ==="") {
            errors.push("You must Include a valid Email");
        }
        
        if(passwordError.trim() !== "" || password.trim() ==="") {
            errors.push("You must Include a valid Password");
        }

        setErrorOnSignup([...errors]);

        if(errors.length <= 0) {

            setUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            
            console.log({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            
      
        }

    }

    //handling otp value 
    const handleOtp = (e) => {
        setOtp(e.target.value.trim()) 
    }

    // handling otp verification 
    const handleOtpVerification = (e) => {
        e.preventDefault();
        console.log("auth with server")

        if(true) {
            console.log("verified with server");
            history.push("/signin");
        }
    }

    return (
        <div className="signup">
            <div className="signup__container">

                <div className="signup__form">

                    <div className="signup__logo">
                        <h1>Social Media</h1>
                    </div>

                    {
                        user
                        ?
                        (
                            <div className="signup__formFields">
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    label="Enter OTP"
                                    type="number"
                                    fullWidth
                                    onChange={(e) => handleOtp(e)}
                                    required
                                />
                                <div className="signup__formFields">
                                    <SignUpButton
                                        type="submit" 
                                        variant="contained" 
                                        color="secondary" 
                                        fullWidth
                                        onClick={(e) => handleOtpVerification(e)}
                                    >
                                        Verify OTP
                                    </SignUpButton>
                                </div>
                            </div>
                        )
                        :
                        (
                            <form noValidate autoComplete="off">

                                <div className="signup__formFields">
                                    <TextField
                                        autoFocus
                                        variant="outlined"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        onChange={(e) => handleFirstName(e)}
                                        required
                                    />
                                </div>
        
                                <div className="signup__formFields">
                                    <TextField
                                        variant="outlined"
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        onChange={(e) => handleLastName(e)}
                                    />
                                </div>
        
                                <div className="signup__formFields">
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
        
                                <div className="signup__formFields">
                                    <TextField
                                        label="New Strong Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        error={passwordError.trim() !==""}
                                        onChange={(e) => handlePassword(e)}
                                        fullWidth
                                    />
                                </div>
        
                                <div className="signup__formFields">
                                    <MuiPhoneNumber fullWidth variant="outlined" defaultCountry={'in'} onChange={handlePhoneNumber}/>
                                </div>
        
                                <div className="signup__formFields">
        
                                    {
                                        errorOnSignup.length > 0
                                        ?
                                        (<div className="signup__formFields">
                                            {
                                                errorOnSignup.map( (item,index) => {
                                                    return <span style={{"color":"coral"}} key={index}>* {item}<br /></span>
                                                })
                                            }
                                        </div>)
                                        :
                                        ("")
                                    }
                                </div>
        
                                <div className="signup__formFields">
                                    <SignUpButton
                                        type="submit" 
                                        variant="contained" 
                                        color="secondary" 
                                        fullWidth
                                        onClick={(e) => handleSignup(e)}
                                    >
                                        signup
                                    </SignUpButton>
                                </div>
                                
                                <hr />
        
                                <div className="signup_formFields">
                                    Instead have an account  ! &nbsp; <a href="#">Sign In</a> 
                                </div>
        
                                
                                <br />
                            </form>

                        )
                    }

                </div>
            </div>


        </div>
    )
}

export default SignUp;
