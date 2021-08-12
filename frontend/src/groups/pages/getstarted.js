import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./getstarted.css";
import Dummy from '../../images/dummy.png';
import Wrong from '../../images/wrong_signup.jpeg';
import Login from '../../images/login.jpg';
import Menu from '../../images/main_menu.jpeg';
import CreateGroup from '../../images/create_group.jpeg';
import JoinGroup from '../../images/join_group.jpeg';
import JoinGroupDetail from '../../images/detail_join_group.jpeg';
import Portfolio from '../../images/portfolio.jpeg';
import Srequest from '../../images/source_requests.jpeg';
import Manage from '../../images/manage.jpeg';
import Manage1 from '../../images/manage1.jpeg';
import Manage2 from '../../images/manage2.jpeg';
import Manage3 from '../../images/manage3.jpeg';
import Stool from '../../images/stooler.jpeg';
import Profile1 from '../../images/profile1.jpeg';
import Profile2 from '../../images/profile2.jpeg';
import AboutUs from '../../images/about2.png';

const GetStarted = props => {
    const auth = useContext(AuthContext);
  
    return (
    <center>
      <div className="get_started_img_list">
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">Step 1: Logging in</h2>
            <img src={Login} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">Step 2: Click 'Create Group' to create a group or click 'Join Group' to join any of the available groups</h2>
            <img src={Menu} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">Step 3 : Create a group </h2>
            <img src={CreateGroup} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">Step 3 (a): Click to join and know the group details </h2>
            <img src={JoinGroup} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">Step 3 (b): Click 'View Source' to know the sources and graphical analysis of the group investment </h2>
            <img src={JoinGroupDetail} className="get_started_img"></img>
        </div>
        <h1 className="features_header">Other Features</h1>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">1) Click Portfolio to see your joined groups</h2>
            <img src={Portfolio} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h2 className="get_started_img_head">2) Manage your source requests (Only for group admins)</h2>
            <img src={Srequest} className="get_started_img"></img>
        </div>

        <div className="get_started_img_div">
            <h2 className="get_started_img_head">3) Manage your groups by clicking Portfolio-&gt;Manage Owned Groups (Only for group admins)</h2>
            <img src={Manage} className="get_started_img"></img> <img src={Manage1} className="get_started_img"></img>
            <h2 className="get_started_img_head2">3 a)  Manage group commands </h2>
             <img src={Manage2} className="get_started_img"></img> 
             <h2 className="get_started_img_head2">3 b) Transfer ownership if required</h2>
            <img src={Manage3} className="get_started_img"></img>
        </div>
        
        <div className="get_started_img_div">
        <h2 className="get_started_img_head">4) Click 'My Profile' to view your Investment Diversity and Transaction history</h2>
            <img src={Profile1} className="get_started_img"></img> 
            <img src={Profile2} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
        <h2 className="get_started_img_head">5) Chat with Stooler to get your queries resolved</h2>
            <img src={Stool} className="get_started_img"></img> 
        </div>
        <div className="get_started_img_div">
        <h2 className="get_started_img_head">6) Visit 'About Us' to understand our Mission</h2>
            <img src={AboutUs} className="get_started_img"></img> 
        </div>
      
      </div></center>
    );
  };
  

export default GetStarted;
