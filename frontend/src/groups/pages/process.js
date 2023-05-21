import React,{useEffect,useState,Fragment} from 'react';
import "./main.css";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Process = () => {
    var userId = localStorage.getItem('__react_session__');
    userId = JSON.parse(userId)
    userId = userId['userId']
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const sid = useParams().sid;
    const status = useParams().status;
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
        var body = {"set":status};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `https://stool-backend.vercel.app/api/source/setapproval/${sid}/${userId}`,"POST",body,{
                'Content-Type': 'application/json'
        }
        );
        if(responseData['status']!=200 && responseData['status']!=202){
            throw responseData.error;
        }
        setCompLoading(false)
        } catch (err) {
            console.log(err)
        }
        };
        fetchGroup();
    }, []);
  return (
  <Fragment>
          {compLoading ?<LoadingSpinner asOverlay /> :(
             <div>
                <center>
                    <h1>Request {status=="true"? 'added': 'rejected' } Successful</h1>
                </center>
             </div>
          )}
        <ul className="group-links">
            <Link to={`/getgroupsource/${userId}`} ><button className="group_button">Manage Group Source</button></Link>
        </ul>
    </Fragment>
  );
};

export default Process;
