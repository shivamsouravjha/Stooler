import React from 'react';
import ReactSession from '../../Reactsession';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      name:"shivam",
      username:ReactSession.get("username"), 
      number:"32424234324",
      email:"hfeegn35bgdfb@gmail.com",
      panNumber:"1125bdhdgf92afh2",
      aadhar:"1252543eghfd132a82",
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 6
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
