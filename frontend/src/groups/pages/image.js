import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./image.css";
import background from '../../images/background2.jpg';
const Image = props => {
    const auth = useContext(AuthContext);
  
    return (
      

<div className="image_div">
	<h1 className="image_head" style={{ backgroundImage: `url(${background})` }}>STOOL</h1>
	<p class="position">Invest in Future</p>

  <div class="inner"></div>
			<div class="inner inner2"></div>
</div>
      
      
    );
  };
  

export default Image;


