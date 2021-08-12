import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./extra.css";
const Extra = props => {
    const auth = useContext(AuthContext);
  
    return (<div>
    
      <div className="about_def_logout">

Do you want your investment to grow more? Do you want your money to make more money?<br/> 
Do you want your financial risk to be the best calculated risk?<br/> So what are you gaping at?
 <br/><br/><strong><Link to="/auth" className="about_link_logout">Signup</Link> and join our community now.</strong>


        
          
        
        
        
      
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
    </div></div>
    );
  };
  

export default Extra;
