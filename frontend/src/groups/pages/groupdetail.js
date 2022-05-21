import React,{useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import GroupList from '../components/grouplist';
import SourceLists from './sourceLists';
import LineChart from '../components/linegraph';
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
            var userId = localStorage.getItem('__react_session__');
            userId = await JSON.parse(userId)
            userId = userId['userId']
            const responseData = await sendRequest(
            `http://localhost:5001/api/groups/${gid}`,"POST"
            );
        
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            const dataResponse = responseData.data;
            var arr = dataResponse.members;
            if(arr.indexOf(userId)==-1){
                setValid(false);
            }
            console.log(arr,userId,arr.indexOf(userId)); //true
            setLoadedGroup(dataResponse);
            setCompLoading(false)
        } catch (err) {}
        };
        fetchGroup();
    }, []);
    var GROUP =""
    var Graph=""
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
    ];
    Graph =[{profit:loadedgroup.profit_deal},{loss:loadedgroup.loss_deal}];
    }
  return (
        <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> : (<Fragment>
            <GroupList items={GROUP} />,
            <SourceLists valid={valid}/>,
            <LineChart graph={Graph}/>,
            </Fragment>)
          }
        </Fragment>);
};

export default Group;
