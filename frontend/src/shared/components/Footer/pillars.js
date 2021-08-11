import React from 'react';
import "./pillars.css";
import confidence from '../../../images/confidence.png';
import clarity from '../../../images/clarity.png';
import community from '../../../images/community.png';
const Pillars = props => {  
    return (
      

<div className="pillar_div">

    <p className="pillar_header"> These are the three main pillars that define who we are </p>
    <div className="flex_img">
	<div className="pillar_img_div_outside"><div className="pillar_img_div"><img className="pillar_img" src={clarity}/></div><h2 className="pillar_img_div_header">Clarity</h2>
    
    <p className="pillar_img_div_body">Easily digestible stock, gold, cryptocurrency and exchange overviews.</p>
     </div>


    <div className="pillar_img_div_outside"><div className="pillar_img_div"><img className="pillar_img" src={confidence}/></div><h2 className="pillar_img_div_header">Confidence</h2>
    <p className="pillar_img_div_body">Providing exposure to the financial growth with utmost safety. </p>
    </div>
    <div className="pillar_img_div_outside"><div className="pillar_img_div"><img className="pillar_img" src={community}/></div><h2 className="pillar_img_div_header">Community</h2>
    <p className="pillar_img_div_body">Building a community where the knowledge of financial freedom is promoted.  </p>
    </div>
</div>
</div>

      
    );
  };
  

export default Pillars;
