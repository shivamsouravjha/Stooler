import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./extra.css";
const Extra = props => {
    const auth = useContext(AuthContext);
  
    return (
    
      <div className="about_def_logout">

Do you want your investment to grow more? Do you want your money to make more money?<br/> 
Do you want your financial risk to be the best calculated risk?<br/> So what are you gaping at?
 <br/><br/><strong><Link to="/auth" className="about_link_logout">Signup</Link> and join our community now.</strong>


        
          
        
        
        
      
      </div>
    );
  };
  

export default Extra;
