import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './groupitem.css';

const SourceItem = props => {
  return (
    <li className="group-item">
      <Card className="group-item__content">
          <div className="group-item__info">
            <h2>Name : {props.name}</h2>
            <h2>Details : {props.details}</h2>
            <h2>TargetPrice : {props.targetPrice}</h2>
            <h2>Duration : {props.duration}</h2>
            <h2>Price : {props.price}</h2>
            <h2>UnitsPurchase : {props.unitsPurchase}</h2>
          </div>
      </Card>
    </li>
  );
};

export default SourceItem;
