import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./main.css";

const Main = props => {
    const auth = useContext(AuthContext);
  
    return (<div>
    
      <div className="group">
        
      <ul className="group-links">
        
        <li> <Link to={`/group_auth`}> 
        <button >CREATE A GROUP</button></Link>
        </li>
        <li > <Link to={`/view_group`} > 
        <button className="group_button">JOIN A GROUP</button></Link>
        </li>
        <li > <Link to={`/gettingstarted`} > 
        <button className="group_button">HOW TO GET STARTED</button></Link>
        </li>
        <li > <Link to={`/crypto`} > 
        <button className="group_button">VIEW CRYPTO</button></Link>
        </li>
        
          
        
        
        
      </ul>
      </div>
      <div className="mission_def">
      <h1 className="about_stool_h1">Our Mission </h1><hr/>
      <p className="about_content">
      <strong>
      <ul className="about_div_ul mission">
      <li> Provide a stable platform to users finding new investment methods </li> 
      <li> Spread the knowledge of financial independence</li>
      <li>Make a community of people willing to help people lead a stable life</li></ul></strong><hr/>
  </p>
    </div>
    </div>
    );
  };
  

export default Main;


