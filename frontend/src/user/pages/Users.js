import React,{useEffect,useState,Fragment} from 'react'
import ReactSession from '../../Reactsession';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';
import Profile from '../../images/profile.png';
const Users = () => {
  const {sendRequest} = useHttpClient();
  const [compLoading, setCompLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setCompLoading(true)
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        const responseData = await sendRequest(
          `https://stool-backend.vercel.app/api/users/account/data/${userId}`,"POST"
        );
        const dataResponse = responseData.data;
        setLoadedUsers(dataResponse);
        setCompLoading(false)
      } catch (err) {    
            console.log(err)
      }
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
      image:Profile,
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
