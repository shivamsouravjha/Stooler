import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>Name : {props.name}</h2>
            <h2>User Name : {props.username}</h2>
            <h2>Number : {props.number}</h2>
            <h2>Email ID : {props.email}</h2>
            <h2>Aadhar : {props.aadhar}</h2>
            <h2>PanNumber : {props.panNumber}</h2>
            <h3>
              Invested in {props.placeCount} {props.placeCount === 1 ? 'Company' : 'Companies'}
            </h3>
          </div>
      </Card>
    </li>
  );
};

export default UserItem;
