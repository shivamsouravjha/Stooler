import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./main.css";

const Main = props => {
    const auth = useContext(AuthContext);
  
    return (
    
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
    );
  };
  

export default Main;


