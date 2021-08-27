import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.username}
          username={user.username}
          image={user.image}
          name={user.name}
          number={user.number}
          email={user.email}
          aadhar={user.aadhar}
          panNumber={user.panNumber}
          groups={user.groups}
          funds={user.funds}
        />
      ))}
    </ul>
  );
};

export default UsersList;
