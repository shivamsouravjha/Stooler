import React from 'react';
import { Link } from 'react-router-dom';
import './list.css';

const Coin = () => {
  return (
    <div>
    <div className="group">
        
    <ul className="group-links">
      <li>
      <Link to={`/equity`}>
      <button className="group_button">Equity</button>
      </Link>
      </li>
      <li > 
      <Link to={`/debt`}>
      <button className="group_button">Debt</button>
      </Link>
      </li>
      <li > 
      <Link to={`/funds_of_funds`}>
      <button className="group_button">Funds of Funds</button>
      </Link>
      </li>
      <li>
      <Link to={`/hybrid`}>
      <button className="group_button">Hybrid</button>
      </Link>
      </li>
      <li > 
      <Link to={`/index`}>
      <button className="group_button">Index</button>
      </Link>
      </li>
      <li > 
      <Link to={`/solution_oriented`}>
      <button className="group_button">Solution Oriented</button>
       </Link>
       </li>
       <li>
       <Link to={`/solution_oriented_children`}>
      <button className="group_button">Solution Oriented - Children's</button>
       </Link>
      </li>
    </ul>
    </div>
    </div>
  );
};

export default Coin;