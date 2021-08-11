import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../images/stool_logo.png';
import "./about.css";

const About = props => {
    const auth = useContext(AuthContext);
  
    return (
      
<div className="about_div">
    <div className="about_pro">
    <p className="about_content">Investment is a complex process and a lot of research goes around it. This is the reason many people are afraid to invest in the market that is 
        producing wealth  constantly. <br/> <br/><strong> The causes behind this fear :</strong>
        <ul className="about_div_ul"><li>Unpredictability of the market</li>
        <li>Lack of market knowledge and research</li>
        <li>Untrustable sources</li>
        <li>Conflict in interests</li>
        </ul> </p> </div>
<div className="about_def">
    <p className="about_content">
    Stool provides you a platform which helps you to climb the ladder of financial growth by investing in groups having members sharing common interests. The common goal of getting high returns leads 
    to deeper research and growth of the investing community.   
  To explain more, Stool lets you invest in a financial entity via group pool. Friends and strangers come together to invest in stocks, gold,cryptocurrency and currency exchange for sharing the investment strategy and profit.
</p>
  </div>

<p className="conclusion">
Do you also want someone to invest in money earning resources on your behalf even if you can invest only 100Rs per month? So what are you gaping at? Sign up and join the best suited group now.

</p>

<div className="faqs">
    <h1 className="faqs_header">FAQs</h1>

    <h2 className="faqs_h2">What is Stool?</h2>
    <h3 className="faqs_h3">Stool is a platform where you can join a group and invest in Stocks, Gold/Silver, Cryptocurrency, Currency Exchange.</h3>
    <hr/>
    <h2 className="faqs_h2">Why to join Stool?</h2>
    <h3 className="faqs_h3">Invest with lowest amount with less stress of managing the resources</h3>
    <hr/>
    <h2 className="faqs_h2">How to join a group?</h2>
    <h3 className="faqs_h3">You can join a group by paying above the minimum amount set by the group leader.</h3>
    <hr/>
    <h2 className="faqs_h2">How to see your expenses?</h2>
    <h3 className="faqs_h3">You can join a group by paying above the minimum amount set by the group leader.</h3>
    <hr/>
    <h2 className="faqs_h2">Have some other doubts?</h2>
    <h3 className="faqs_h3">Mail to :<a href="mailto:stool@googlegroups.com"> stool@googlegroups.com</a>    to clear your doubts</h3>
    <hr/>
</div>
</div>

    );
  };
  

export default About;