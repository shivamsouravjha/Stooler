import React from 'react';
import "./pillars.css";
import confidence from '../../../images/confidence.png';
import clarity from '../../../images/clarity.png';
import community from '../../../images/community.png';
const Pillars = props => {  
    return (
      

<div className="slider">
    <figure>
        <img src={clarity}/>
        <img src={confidence}/>
        <img src={community}/>
    </figure>
</div>


      
    );
  };
  

export default Pillars;
