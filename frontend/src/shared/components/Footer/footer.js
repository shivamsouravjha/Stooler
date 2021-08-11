import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {SocialMediaIconsReact} from 'social-media-icons-react';
import Logo from '../../../images/stool_logo.png';
import "./footer.css";

const Footer = props => {
    const auth = useContext(AuthContext);
  
    return (
      

<footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span className="footer_span"> About Stool</span> 
      Stool is a platform where you can join a group and invest in Stocks, Gold/Silver, Cryptocurrency, Currency Exchange.
      You can join a group by paying above the minimum amount set by the group leader. Invest with lowest amount with less stress of managing the resources.
    </p>
    <div class="icons">
      
      <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="2" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(10,101,126,1)" iconSize="5" roundness="20%" url="https://some-website.com/my-social-media-url" size="35" />
      <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="2" borderStyle="solid" icon="github" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(10,101,126,1)" iconSize="5" roundness="20%" url="https://some-website.com/my-social-media-url" size="35" />
      <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="2" borderStyle="solid" icon="linkedin" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(10,101,126,1)" iconSize="5" roundness="20%" url="https://some-website.com/my-social-media-url" size="35" />
      <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="2" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(10,101,126,1)" iconSize="5" roundness="20%" url="https://some-website.com/my-social-media-url" size="35" />
      <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="2" borderStyle="solid" icon="medium" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(10,101,126,1)" iconSize="5" roundness="20%" url="https://some-website.com/my-social-media-url" size="35" />
      
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
    <div>
      <FontAwesomeIcon className="footer_center_icon" icon={faMapMarkerAlt} size="1.5x" />
      <p><span className="footer_center_span"> Street name and number</span> India</p>
    </div>
    <div>
    <FontAwesomeIcon className="footer_center_icon" icon={faPhoneAlt} size="1.5x"/> 
      <p> (+91) 99999 99999</p>
    </div>
    <div>
    <FontAwesomeIcon className="footer_center_icon" icon={faEnvelope} size="1.5x"/> 
      <p><a href="#"> stool@googlegroups.com</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <h2 className="company_header"> STOOL<img src={Logo} className="logo"/></h2>
    <p class="menu">
    <NavLink to="/" exact> Home </NavLink> | <NavLink to="/aboutus" exact> About Us</NavLink>  
    </p>
    <p class="name"> Stool &copy; 2021</p>
  </div>
  
</footer>
      
      
    );
  };
  

export default Footer;