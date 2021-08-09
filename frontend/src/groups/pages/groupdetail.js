import React,{useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import GroupList from '../components/grouplist';
import SourceLists from './sourceLists';
const Group = () => {
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const [loadedgroup, setLoadedGroup] = useState();
    const gid = useParams().gid;
    const [valid,setValid]=useState(true);
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
            var userid = localStorage.getItem('__react_session__');
            userid = await JSON.parse(userid)
            userid = userid['userid']
            const responseData = await sendRequest(
            `http://stool-back.herokuapp.com/api/groups/${gid}`,"POST"
            );
        
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            const dataResponse = responseData.data;
            var arr = dataResponse.members;
            if(arr.indexOf(userid)==-1){
                setValid(false);
            }
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
            <GroupList items={GROUP} />,
            <SourceLists valid={valid}/>

          )}
        </Fragment>);
};

export default Group;
