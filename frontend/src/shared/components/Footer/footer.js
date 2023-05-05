import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebook, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import Logo from '../../../images/stool_logo.png';
import "./footer.css";

const Footer = () => {
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
  <div className="footer-right col-md-4 col-sm-6">
    <h2 className="company_header"> NIVESH<img src={Logo} className="logo"/></h2>
    <p className="menu">
    <NavLink to="/" exact> Home </NavLink> | <NavLink to="/aboutus" exact> About Us</NavLink>
    </p>
    <p className="name"> Nivesh &copy; 2021</p>
  </div>

</footer>


    );
  };


export default Footer;
