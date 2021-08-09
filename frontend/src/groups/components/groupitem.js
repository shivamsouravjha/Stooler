import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import './groupitem.css';

const GroupItem = props => {
  return (
    <li className="group-item">
      <Card className="group-item__content">
          <div className="group-item__info">
            <h2><strong>Group Name :</strong> {props.groupName}</h2>
            <h2><strong>Description :</strong> {props.description}</h2>
            <h2><strong>Genre : </strong>{props.genre}</h2>
            <h2><strong>Duration (in months):</strong> {props.duration}</h2>
            <h2><strong>Amount :</strong> {props.amount}</h2>
          </div>
      </Card>
    </li>
  );
};

export default GroupItem;
