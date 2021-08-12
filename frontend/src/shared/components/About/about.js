import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import crypto from '../../../images/crypto.png';
import currency from '../../../images/currency.png';
import stock from '../../../images/stock.png';
import gold from '../../../images/gold.png';
import Logo from '../../../images/stool_logo.png';
import "./about.css";

const About = props => {
    const auth = useContext(AuthContext);
  
    return (
      
<div className="about_div">
<div className="about_def">
    <h1 className="about_stool_h1">About Stool <img className="logo" src={Logo}></img></h1>
    <p className="about_content">
    Stool provides you a platform which helps you to climb the ladder of financial growth by investing in groups having members sharing common interests. The common goal of getting high returns leads 
    to deeper research and growth of the investing community.   
  To explain more, Stool lets you invest in a financial entity via group pool. Friends and strangers come together to invest in stocks, gold, cryptocurrency and currency exchange for sharing the investment strategy and profit.
</p>
  </div>

<div className="about_def">
    <h1 className="about_stool_h1">Our Mission </h1><hr/>
    <p className="about_content">
    <strong>
    <ul className="about_div_ul mission">
    <li> Provide a stable platform to users finding new investment methods </li> 
    <li> Spread the knowledge of financial independence</li>
    <li>Make a community of people willing to help people lead a stable life</li></ul></strong><hr/>
</p>
  </div>


    <div className="about_pro">
    <p className="about_content">Investment is a complex process and a lot of research goes around it. This is the reason many people are afraid to invest in the market that is 
        producing wealth  constantly. <br/> <br/><strong> The causes behind this fear :</strong>
        <ul className="about_div_ul"><li>Unpredictability of the market</li>
        <li>Lack of market knowledge and research</li>
        <li>Untrustable sources</li>
        <li>Conflict in interests</li>
        </ul> </p> </div>


<div className="pillar_div">

    <p className="pillar_header"> Prominent Financial Entities where you can invest and get good returns </p>
    <div className="flex_img">
    
	<div className="about_img_div_outside"><div className="about_img_div"><img className="pillar_img" src={stock}/></div><h2 className="pillar_img_div_header">Stocks</h2>
    <p className="about_img_div_body">A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. To know more,<br/> <a className="about_link" href="https://www.investopedia.com/terms/s/stock.asp">Click Here
    
     </a></p></div>


     <div className="about_img_div_outside"><div className="about_img_div"><img className="pillar_img" src={crypto}/></div><h2 className="pillar_img_div_header">Cryptocurrency</h2>
    <p className="about_img_div_body">Cryptocurrency is a type of digital currency that generally only exists electronically.  To know more,<br/> <a className="about_link" href="https://www.consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams">Click Here
    
    </a></p></div>

    
    <div className="about_img_div_outside"><div className="about_img_div"><img className="pillar_img" src={currency}/></div><h2 className="pillar_img_div_header">Currency Exchange</h2>
    <p className="about_img_div_body">Currency Exchange(also known as Foreign Exchange,forex or FX) is the trading of one currency for another. To know more,<br/> <a className="about_link" href="https://www.investopedia.com/terms/f/foreign-exchange.asp">Click Here
    
    </a></p></div>
    
    <div className="about_img_div_outside"><div className="about_img_div"><img className="pillar_img" src={gold}/></div><h2 className="pillar_img_div_header">Gold/Silver</h2>
    <p className="about_img_div_body">Gold investment can be done in many ways like buying jewellery, coins, gold funds,sovereign gold bond scheme, etc.
     To know more,<br/> <a className="about_link" href="https://groww.in/p/gold-investment/">Click Here
    
    </a></p></div>
</div>
</div>
<p className="conclusion">
Do you want your investment to grow more? Do you want your money to make more money? 
Do you want your financial risk to be the best calculated risk? So what are you gaping at?&nbsp;
 <strong><Link to="/auth" className="about_link_logout">Signup</Link> and join our community now.</strong>

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
    <h3 className="faqs_h3">Mail to :<a href="mailto:stool@googlegroups.com"> stool@googlegroups.com</a> to clear your doubts</h3>
    <hr/>
</div>
</div>

    );
  };
  

export default About;