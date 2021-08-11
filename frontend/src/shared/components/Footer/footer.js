import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {SocialMediaIconsReact} from 'social-media-icons-react';

import "./footer.css";

const Footer = props => {
    const auth = useContext(AuthContext);
  
    return (
      

<footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
      ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
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
      <i class="fa fa-map-marker"></i>
      <p><span> Street name and number</span> City, Country</p>
    </div>
    <div>
      <i class="fa fa-phone"></i>
      <p> (+00) 0000 000 000</p>
    </div>
    <div>
      <i class="fa fa-envelope"></i>
      <p><a href="#"> office@company.com</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <h2> Company<span> logo</span></h2>
    <p class="menu">
      <a href="#"> Home</a> |
      <a href="#"> About</a> |
      <a href="#"> Services</a> |
      <a href="#"> Portfolio</a> |
      <a href="#"> News</a> |
      <a href="#"> Contact</a>
    </p>
    <p class="name"> Company Name &copy; 2016</p>
  </div>
</footer>
      
      
    );
  };
  

export default Footer;