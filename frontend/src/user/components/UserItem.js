import React from 'react';
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
            <h2><strong>Name :</strong> {props.name}</h2>
            <h2><strong>Username :</strong> {props.username}</h2>
            <h2><strong>Contact :</strong> {props.number}</h2>
            <h2><strong>Email ID :</strong> {props.email}</h2>
            <h2><strong>Aadhar :</strong> {props.aadhar}</h2>
            <h2><strong>PAN:</strong> {props.panNumber}</h2>
            
            
              <hr className="investment_hr"/>
               <p className="investment">Invested in {props.groups} {props.groups === 1 ? 'Group' : 'Groups'} </p>
         
          </div>
      </Card>
    </li>
  );
};

export default UserItem;
