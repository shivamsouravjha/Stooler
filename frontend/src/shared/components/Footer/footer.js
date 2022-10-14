import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {fab, faTwitterSquare, faFacebook, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import Logo from '../../../images/stool_logo.png';
import "./footer.css";

const Footer = props => {
    const auth = useContext(AuthContext);

    return (


<footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span className="footer_span"> About Us</span>
      Nivesh is a platform where you can join a group and invest in Stocks, Gold/Silver, Cryptocurrency, Currency Exchange.
      You can join a group by paying above the minimum amount set by the group leader. Invest with lowest amount with less stress of managing the resources.
    </p>
    <div class="icons">



    <a><FontAwesomeIcon className="footer_left_icon"  icon={faTwitterSquare} size="1.5x" /></a>
    <a><FontAwesomeIcon className="footer_left_icon"  icon={faLinkedin} size="1.5x" /></a>
    <a><FontAwesomeIcon  className="footer_left_icon"  icon={faGithub} size="1.5x" /></a>
    <a> <FontAwesomeIcon className="footer_left_icon"  icon={faFacebook}  size="1.5x" /></a>


    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6 social-container">
    <div>
      <FontAwesomeIcon className="footer_center_icon" icon={faMapMarkerAlt} size="1.5x" />
      <p><span className="footer_center_span">Street name and number</span>India</p>
    </div>
    <div>
    <FontAwesomeIcon className="footer_center_icon" icon={faPhoneAlt} size="1.5x"/>
      <p><a href="tel:9999999999" style={{color:"white"}}> (+91) 99999 99999</a></p>
    </div>
    <div>
    <FontAwesomeIcon className="footer_center_icon" icon={faEnvelope} size="1.5x"/>
      <p><a href="mailto:stool@googlegroups.com">nivesh@googlegroups.com</a></p>
    </div>
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <h2 className="company_header"> NIVESH<img src={Logo} className="logo"/></h2>
    <p class="menu">
    <NavLink to="/" exact> Home </NavLink> | <NavLink to="/aboutus" exact> About Us</NavLink>
    </p>
    <p class="name"> Nivesh &copy; 2021</p>
  </div>

</footer>


    );
  };


export default Footer;
