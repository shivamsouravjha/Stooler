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
        <button className="group_button" >CREATE A GROUP</button></Link>
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
        <li> <Link to={`/mutual_funds`}> 
          <button className="group_button">VIEW MUTUAL FUNDS</button> </Link>
        </li>
        
          
        
        
        
      </ul>
      </div>
      
    </div>
    );
  };
  

export default Main;


