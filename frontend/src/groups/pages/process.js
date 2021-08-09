import React,{useEffect,useState,Fragment} from 'react';
import "./main.css";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
const Process = () => {
    var userid = localStorage.getItem('__react_session__');
    userid = JSON.parse(userid)
    userid = userid['userid']
    const {sendRequest} = useHttpClient();
    const [compLoading, setCompLoading] = useState(true);
    const sid = useParams().sid;
    const status = useParams().status;
    useEffect(() => {
        const fetchGroup = async () => {
        try {
            setCompLoading(true)
        var body = {"set":status};
        console.log(status);
        console.log(body);
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `https://stool-back.herokuapp.com/api/source/setapproval/${sid}`,"POST",body,{
                'Content-Type': 'application/json'
        }
        );
        if(responseData['status']!=200 && responseData['status']!=202){
            throw responseData.error;
        }
        setCompLoading(false)
        } catch (err) {}
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
            <Link to={`/getgroupsource/${userid}`} ><button className="group_button">Manage Group Source</button></Link>
        </ul>
    </Fragment>
  );
};

export default Process;
