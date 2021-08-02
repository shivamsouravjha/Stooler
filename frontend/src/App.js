import React, { useState, useCallback, useEffect} from 'react';
import ReactSession from './Reactsession';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams
} from 'react-router-dom';
import Main from './groups/pages/main';
import MyGroup from './groups/pages/mygroup';
import GroupAuth from './groups/pages/creategroup';
import Auth from './user/pages/Auth';
import Profile from './user/pages/Profile';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import JoinGroup from './groups/pages/getjoinGroups';
import JoinGroupAuth from './groups/pages/joingroups';
import YourGroup from './groups/pages/groupSource';
import SourceDetails from './groups/pages/sourceDetails';
import GetGroupSource from './groups/pages/getgroupsource';
import Process from './groups/pages/process';
const App = () => {
  ReactSession.setStoreType("localStorage");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    ReactSession.remove('username');
    ReactSession.remove('userid');
    ReactSession.remove('token');
  }, []);
  
  useEffect(() => {
    if (ReactSession.get("username")) {
      login();
    }
  }, [login]);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/group_auth" exact>
          <GroupAuth />
        </Route>
        <Route path="/view_group" exact>
          <JoinGroup />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/group/:gid" exact>
          <JoinGroupAuth/>
        </Route>
        <Route path="/portfolio" exact>
          <MyGroup />
        </Route>
        <Route path="/yourgroup/:gid" exact>
          <YourGroup/>
        </Route>
        <Route path="/source/:sid" exact>
          <SourceDetails/>
        </Route>
        <Route path="/getgroupsource/:uid" exact>
          <GetGroupSource/>
        </Route>
        <Route path="/request/:sid/:status" exact>
          <Process/>
        </Route>
        <Redirect to="/" />       
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          This IS HOME, Authenticate please
        </Route>
        
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>      
    </AuthContext.Provider>
  );
};

export default App;
