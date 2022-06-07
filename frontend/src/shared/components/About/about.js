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
  <div className="aboutsection">
    <div className="innercontainer">
      <h1 >ABOUT US</h1>
      <p className="text">Nivesh provides you a platform which helps you to climb the ladder of financial growth by investing in groups having members sharing common interests. The common goal of getting high returns leads 
    to deeper research and growth of the investing community.   
    To explain more, Nivesh lets you invest in a financial entity via group pool. Friends and strangers come together to invest in stocks, gold, cryptocurrency and currency exchange for sharing the investment strategy and profit.</p>
    </div>
  </div>


  <div className="aboutsectionl">
    <div className="innercontainerl">
      <h1 >Background</h1>
      <p className="text">
      Investment is a complex process and a lot of research goes around it. This is the reason many people are afraid to invest in the market that is 
        producing wealth  constantly. The causes behind this fear :
        <ul className="about_div_ul"><li>Unpredictability of the market</li>
        <li>Lack of market knowledge and research</li>
        <li>Untrustable sources</li>
        <li>Conflict in interests</li>
        </ul> </p> 
    </div>
  </div>

  <div className="aboutsectionr">
    <div className="innercontainerr">
      <h1 >Why Us?</h1>
      <p className="text">
        <ul className="about_div_ul">
      <li>Provide a stable platform to users finding new investment methods </li>
     <li>Spread the knowledge of financial independence</li>
      <li>Make a community of people willing to help people lead a stable life</li>
    </ul></p>
    </div>
  </div>

  


  <div className="pillar_div">

<p className="pillar_header"> Prominent Financial Entities where you can invest and get good returns </p>

</div>
  <div className='aboutparallel'>
  <div className="about_def">
    <p className="about_content"><img className="pillarimg" src={stock}/><br></br>
    <h1 className="about_stool_h1">Stocks</h1>
    A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. 
    <br/> <a className="about_link" href="https://www.investopedia.com/terms/s/stock.asp">Read More
    </a>
    </p>
  </div>

  <div className="about_def">
    <p className="about_content"><img className="pillarimg" src={crypto}/><br></br>
    <h1 className="about_stool_h1">Cryptocurrency </h1>
    Cryptocurrency is a type of digital currency that generally only exists electronically. 
    <br/> <a className="about_link" href="https://www.consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams">Read More
    </a>
    </p>
  </div>

  <div className="about_def">
    <p className="about_content"><img className="pillarimg" src={currency}/><br></br>
    <h1 className="about_stool_h1">Currency Exchange </h1>
    Currency Exchange(also known as Foreign Exchange,forex or FX) is the trading of one currency for another.
     <br/> <a className="about_link" href="https://www.investopedia.com/terms/f/foreign-exchange.asp">Read More
    </a>
    </p>
  </div>

  <div className="about_def">
    <p className="about_content"><img className="pillarimg" src={gold}/><br></br>
    <h1 className="about_stool_h1">Gold/Silver </h1>
    Gold investment can be done in many ways like buying jewellery, coins, gold funds,sovereign gold bond scheme, etc.
     <br/> <a className="about_link" href="https://groww.in/p/gold-investment/">Read More
    
      </a></p> 
  </div>
  </div>



  
    
    <br></br>
    <div className="faqbox">
      <p className='faqheading'>FAQs</p>
      <div className='faqs'>
        <details>
          <summary>What is Nivesh?</summary>
          <hr className='faqline'></hr>
          <p className='faqtext'>Nivesh is a paltform where you can join a group and invest in Stocks, Gold, Cryptocurrency, Currency Exchange.</p>
        </details>
        <details>
          <summary>Why to join Nivesh?</summary>
          <hr className='faqline'></hr>
          <p className='faqtext'>Invest with lowest amount with less stress of managing the resources.</p>
        </details>
        <details>
          <summary>How to join a group?</summary>
          <hr className='faqline'></hr>
          <p className='faqtext'>You can join a group by paying above the minimum amount set by the group leader.</p>
        </details>
        <details>
          <summary>Have some other doubts?</summary>
          <hr className='faqline'></hr>
          <p className='faqtext'>Mail to: nivesh@googlegroups.com</p>
        </details>
        
      </div>
    </div>

    <div className="conclusion">
      <div className="statictext">Join NIVESH if you want your</div>
      <ul className="dynamictext">
     <li><span> INVESTMENTS TO GROW MORE!</span></li> 
     <li><span> MONEY TO MAKE MORE MONEY!</span>  </li> 
     <li><span> FINANCIAL RISKS TO BE MINIMAL!</span></li>
     </ul>
     
    </div>
    


</div>


    );
  };
  

export default About;