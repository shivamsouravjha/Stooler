import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './groupitem.css';

const GroupItem = props => {
  return (
    <li className="group-item">
      <Card className="group-item__content">
          <div className="group-item__info">
            <h2>Group Name : {props.groupName}</h2>
            <h2>Description : {props.description}</h2>
            <h2>Genre : {props.genre}</h2>
            <h2>Duration : {props.duration}</h2>
            <h2>Amount : {props.amount}</h2>
          </div>
      </Card>
    </li>
  );
};

export default GroupItem;
