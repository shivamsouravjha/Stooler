import React,{useEffect,useState,Fragment} from 'react'
import ReactSession from '../../Reactsession';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';

const Users = () => {
  const {sendRequest} = useHttpClient();
  const [compLoading, setCompLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setCompLoading(true)
        var userid = localStorage.getItem('__react_session__');
        userid = await JSON.parse(userid)
        userid = userid['userid']
        const responseData = await sendRequest(
          `http://stool-back.herokuapp.com/api/users/account/${userid}`
        );
        console.log(responseData.data)
        const dataResponse = responseData.data;
        setLoadedUsers(dataResponse);
        setCompLoading(false)
      } catch (err) {}
    };
    fetchUsers();
  }, []);
  var USERS =""
  if(!compLoading){
   USERS = [
    {
      name:loadedUsers.name,
      username:ReactSession.get("username"), 
      number:loadedUsers.number,
      email:loadedUsers.email,
      panNumber:loadedUsers.panNumber,
      aadhar:loadedUsers.aadhar,
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      groups: loadedUsers.groups.length
    }
  ];}
  return (
  <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> : (
            <UsersList items={USERS} />
          )}
        </Fragment>);
};

export default Users;
