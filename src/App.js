import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
// import Home from "./components/Home/Home";
import Feeds from "./components/Feeds/Feeds";
import { useStateValue } from './StateProvider';
import Profile from './components/Profile/Profile';
import FullScreenOverlayLayout from './Layouts/FullScreenOverlayLayout/FullScreenOverlayLayout';
import Upload from './components/Upload/Upload';

const App = () => {

  const [{user,authToken},dispatch] = useStateValue();

  // fetch user data from server
  // useEffect(() => {
  //   fetch(`${BASE_URL}/secured/getuser`, {
  //     headers: {
  //         "auth-token":{authToken}
  //     }
  // })
  // .then((res => res.json()))
  // .then((res => {
  //     console.log(res)
  // }))
  // }, [user])

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          
          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/feeds">
             <Feeds />
          </Route>
       
          <Route path="/profile">
            <Profile email={user?.email}  />
          </Route>
          

          {/* <Route path='/:username' render={(props) => {
            return ( 
              <div> 
                {` Hello ${props.match.params.username}`}
                {
                  false
                  ?
                  <h1>hiie this is your profile</h1>
                  :
                  <h1>login to see profile</h1>
                }
              </div> 
            )
          }} /> */}

          <Route path="/">
            <Upload />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
