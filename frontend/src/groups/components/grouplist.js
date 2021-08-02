import React from 'react';

import GroupItem from './groupitem';
import Card from '../../shared/components/UIElements/Card';
import './grouplist.css';

const GroupList = props => {
  return (
    <ul className="group-list">
      {props.items.map(group => (
        <GroupItem
          key={group.groupName}
          groupName={group.groupName}
          description={group.description}
          genre={group.genre}
          duration={group.duration}
          amount={group.amount}
        />
      ))}
    </ul>
  );
};

export default GroupList;
