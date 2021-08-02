import React,{useEffect,useState,Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Process = () => {
    var userid = localStorage.getItem('__react_session__');
    userid = JSON.parse(userid)
    userid = userid['userid']
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const sid = useParams().sid;
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
        var body = {"set":true};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `http://localhost:5000/api/source/setapproval/${sid}`,"POST",body,{
                'Content-Type': 'application/json'
        }
        );
        setCompLoading(false)
        } catch (err) {}
        };
        fetchGroup();
    }, []);
  return (
  <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> : <do here></do>}
        </Fragment>);
};

export default Process;
