import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./getstarted.css";
import Dummy from '../../images/dummy.png';

const GetStarted = props => {
    const auth = useContext(AuthContext);
  
    return (
    <center>
      <div className="get_started_img_list">
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
        <div className="get_started_img_div">
            <h1 className="get_started_img_head">Step 1</h1>
            <img src={Dummy} className="get_started_img"></img>
        </div>
      
      </div></center>
    );
  };
  

export default GetStarted;
