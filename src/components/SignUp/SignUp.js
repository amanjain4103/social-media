import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {MyBasicButton} from "../Buttons/Buttons";
import "./SignUp.css";
import MuiPhoneNumber from "material-ui-phone-number";
import {validateEmail, validatePassword} from "../../validator"
import {useHistory} from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import CircularProgress from '@material-ui/core/CircularProgress';
// import MyAlert from '../MyAlert/MyAlert';


// already exposed by react
const BASE_URL = process.env.REACT_APP_BASE_URL;


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
    const [isSignupLoading, setIsSignupLoading] = useState(false)
    // const [showAlert, setShowAlert] = useState(false);

    const [state, dispatch] = useStateValue();
    
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

            
            setIsSignupLoading(true);
            
            // console.log({
            //     firstName: firstName,
            //     lastName: lastName,
            //     email: email,
            //     password: password
            // })


            //send mobile number for otp verification
            fetch(`${BASE_URL}/otp/send`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "phonenumber":phoneNumber,
                    "channel":"sms"
                })
            })
            .then((res => res.json()))
            .then((res => {
                console.log(res.message)
                
                if(res.message=== "otpSent") {
                    // otp sent successfully

                    //this will set user due to which otp verification components comes up
                    setUser({
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    })

                }else {
                    // may be some error occured
                    alert(res.message);
                }

                setIsSignupLoading(false);
            
            }))
            // .catch((error) => {
            //     console.log("error"+error)
            //     setIsSignupLoading(false);
            // })
            


      
        }

    }

    //handling otp value 
    const handleOtp = (e) => {
        setOtp(e.target.value.trim()) 
    }

    // handling otp verification 
    const handleOtpVerification = (e) => {

        e.preventDefault();
        // console.log("auth with server")

        // setShowAlert(true);
        // setTimeout(() => { setShowAlert(false) },6000)

        fetch(`${BASE_URL}/otp/verify`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "phonenumber":phoneNumber,
                "code":otp
            })
        })
        .then((res => res.json()))
        .then((res => {

            console.log(res.message)


            if(res.message ==="successfulSignup") {
                // hence the user is created and now I can signin with those credentials
                history.push("/signin");
            }else {
                // there is some problem occured while signup or otp verification
                alert(res.message);
                setUser(null);
            }

            
        }))
        .catch((error) => {
            console.log(error)
        })

        if(true) {
            console.log("verified with server");
            
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
                                    <MyBasicButton
                                        type="submit" 
                                        variant="contained" 
                                        color="secondary" 
                                        fullWidth
                                        onClick={(e) => handleOtpVerification(e)}
                                    >
                                        Verify {"&"} signup
                                    </MyBasicButton>
                                </div>

                                {/* {
                                    showAlert
                                    ?
                                    (<MyAlert message={"hello world"} error={true} />)
                                    :
                                    ("")
                                } */}
                                
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
                                        (
                                            <div className="signup__formFields">
                                                {
                                                    errorOnSignup.map( (item,index) => {
                                                        return <span style={{"color":"coral"}} key={index}>* {item}<br /></span>
                                                    })
                                                }
                                            </div>
                                        )
                                        :
                                        ("")
                                    }
                                </div>

                                <div className="signup__formFields">
                                    <span style={{"color":"green","fontWeight":"600"}}>* Phone numbers are not stored</span> 
                                </div>
                                    
                                {
                                    isSignupLoading
                                    ?
                                    (
                                        <div className="signup__formFields">
                                            <MyBasicButton
                                                variant="outlined" 
                                                color="secondary" 
                                                fullWidth
                                            >
                                                <CircularProgress color="secondary" />
                                            </MyBasicButton>
                                        </div>
                                                
                                    )
                                    :
                                    (
                                        <div className="signup__formFields">
                                            <MyBasicButton
                                                type="submit" 
                                                variant="contained" 
                                                color="secondary" 
                                                fullWidth
                                                onClick={(e) => handleSignup(e)}
                                            >
                                                send otp
                                            </MyBasicButton>
                                        </div>
                                        
                                    )
                                }
                                
                                <hr />
        
                                <div className="signup_formFields">
                                    Already have an account  ! &nbsp; <a href="#" onClick={()=>history.push("/signin")}>Sign In</a> 
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
