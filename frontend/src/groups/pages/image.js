import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth_context';
import "./image.css";
import nivesh from '../../images/NIVESH.png';

const Image = props => {
    const auth = useContext(AuthContext);
  
    return (
      

<div className="image_div">
	<figure>
    <img src={nivesh}></img>
  </figure>
  <div class="inner"></div>
			<div class="inner inner2"></div>
</div>
      
      
    );
  };
  

export default Image;


