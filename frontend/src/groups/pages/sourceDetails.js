import React,{useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import ReactSession from '../../Reactsession';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Sourcelist from '../components/sourcelist';
const Group = () => {
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const [loadedgroup, setLoadedGroup] = useState();
    const sid = useParams().sid;
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
            console.log(sid)
            const responseData = await sendRequest(
            `https://stool-backend.vercel.app/api/source/getcompanydetails/${sid}`,"POST"
            );
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            const dataResponse = responseData.data.source;
            setLoadedGroup(dataResponse);
            setCompLoading(false)
        } catch (err) {}
        };
        fetchGroup();
    }, []);
    var GROUP =""
    if(!compLoading){
    GROUP = [
        {
            name:loadedgroup.name,
            details:loadedgroup.details,
            targetPrice:loadedgroup.targetPrice,
            duration:loadedgroup.duration,
            price:loadedgroup.price,
            unitsPurchase:loadedgroup.unitsPurchase,
        }
    ];}
  return (
  <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> : (
            <Sourcelist items={GROUP} />
          )}
        </Fragment>);
};

export default Group;
