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
import GetStarted from './groups/pages/getstarted';
import Image from './groups/pages/image';
import MyGroup from './groups/pages/mygroup';
import Extra from './groups/pages/extra';
import GroupAuth from './groups/pages/creategroup';
import Auth from './user/pages/Auth';
import AddMoney from './user/pages/addmoney';
import Profile from './user/pages/Profile';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Pillars from './shared/components/Footer/pillars';
import About from './shared/components/About/about';
import Footer from './shared/components/Footer/footer';
import { AuthContext } from './shared/context/auth-context';
import JoinGroup from './groups/pages/getjoinGroups';
import JoinGroupAuth from './groups/pages/joingroups';
import YourGroup from './groups/pages/groupSource';
import SourceDetails from './groups/pages/sourceDetails';
import GetGroupSource from './groups/pages/getgroupsource';
import Process from './groups/pages/process';
import OwnedGroups from './groups/pages/ownedGroups';
import GroupMembers from './groups/pages/groupMembers';
import EditSource from '../src/groups/pages/editsource';
import RequestSource from '../src/groups/pages/requestsource';
import DeleteSource from '../src/groups/pages/deletesource';
import Chatbot from '../src/chatbot/chatbot';
import Crypto from './crypto/crypto';
import Mutual_Funds from './mutual_funds/list';
import Debt from './mutual_funds/Item/debt';
import Equity from './mutual_funds/Item/equity';
import Funds_of_funds from './mutual_funds/Item/funds_of_funds';
import Hybrid from './mutual_funds/Item/hybrid';
import Index from './mutual_funds/Item/index';
import Solution from './mutual_funds/Item/solution';
import Children from './mutual_funds/Item/children';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {

  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>

          <Image/>
          <Main />
          <Pillars/>
        </Route>
        <Route path="/group_auth" exact>
          <GroupAuth />
        </Route>
        <Route path="/view_group" exact>
          <JoinGroup />
        </Route>
        <Route path="/addmoney" exact>
          <AddMoney />
        </Route>
        <Route path="/gettingstarted" exact>
          <GetStarted />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/aboutus">
          <About/>
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
        <Route path="/editsource/:sid" exact>
          <EditSource/>
        </Route>
        <Route path="/deletesource/:sid" exact>
          <DeleteSource/>
        </Route>
        <Route path="/requestsource/:gid" exact>
          <RequestSource/>
        </Route>
        <Route path="/groupdetails/:gid" exact>
          <GroupMembers/>
        </Route>

        <Route path="/ownedgroups/getgroups/:gid" exact>
          <OwnedGroups/>
        </Route>
        {/* <Route path="/transfergroupownership/getgroups/:gid" exact>
          <OwnedGroups/>
        </Route> */}
        <Route path="/crypto" exact>
          <Crypto/>
        </Route>
        <Route path="/mutual_funds" exact>
          <Mutual_Funds/>
        </Route>
        <Route path="/equity" exact>
          <Equity/>
        </Route>
        <Route path="/debt" exact>
          <Debt/>
        </Route>
        <Route path="/funds_of_funds" exact>
          <Funds_of_funds/>
        </Route>
        <Route path="/index" exact>
          <Index/>
        </Route>
        <Route path="/hybrid" exact>
          <Hybrid/>
        </Route>
        <Route path="/solution_oriented" exact>
          <Solution/>
        </Route>
        <Route path="/solution_oriented_children" exact>
          <Children/>
        </Route>
        <Redirect to="/" />       
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
        
        <Image />
        <Extra/>
        <Pillars/>
        </Route>
        <Route path="/aboutus">
          <About/>
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
      value={{ 
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout 
      }}
    >
      
      <Router>
      <MainNavigation />
        <main>{routes}</main>
        <div className="bot">
            <Route path="/" component={Chatbot} exact />
            
            <Footer/>
       </div>
      </Router>  
    </AuthContext.Provider>
  );
};

export default App;
