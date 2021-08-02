import React,{useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import ReactSession from '../../Reactsession';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import GroupList from '../components/grouplist';
import SourceLists from './sourceLists';
const Group = () => {
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const [loadedgroup, setLoadedGroup] = useState();
    const gid = useParams().gid;
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
            const responseData = await sendRequest(
            `http://stool-back.herokuapp.com/api/groups/${gid}`,"POST"
            );
            console.log(responseData.data)
            const dataResponse = responseData.data;
            setLoadedGroup(dataResponse);
            setCompLoading(false)
        } catch (err) {}
        };
        fetchGroup();
    }, []);
    var GROUP =""
    if(!compLoading){
        // console.log("loadedgroup")
    GROUP = [
        {
            groupName:loadedgroup.groupName,
            description:loadedgroup.description,
            genre:loadedgroup.genre,
            duration:loadedgroup.duration,
            amount:loadedgroup.amount
        }
    ];}
  return (
  <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> : (
            <GroupList items={GROUP} />
          )}
           <SourceLists />
        </Fragment>);
};

export default Group;
