import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import GroupDetail from './groupdetail';

const  JoinGroupAuth = ()=>{
   const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
 
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [unitsPurchase,setUnitspurchase]=useState("");
    const [targetPrice,setTragetprice]=useState("");
    const [details,setDetails]=useState("");
    const [duration,setDuration]=useState("");
    const gid = useParams().gid;
    
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);
            var userId = localStorage.getItem('__react_session__');
            userId = await JSON.parse(userId)
            userId = userId['userId']
            var body={"name":name,"price":price,"unitsPurchase":unitsPurchase,"targetPrice":targetPrice,"details":details,"duration":duration};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://localhost:5001/api/source/add/${gid}/${userId}`,"POST",body,{
                    'Content-Type': 'application/json'
            }
              );
              if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            setSuccess(responseData.data.message || 'Something went wrong, please try again.');
            setIsLoading(false);
            //window.location="/";
        }catch(err){
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again.');
        }
    }
    const successHandler = () => {
        setSuccess(null);
        setError(null);
      };
    const letlev = async e =>{
        // e.preventDefault();
        try{
        setIsLoading(true)
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        var body={"groupId":gid};
        console.log(body)
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `http://localhost:5001/api/groups/remove/${userId}/`,"POST",body,{
                'Content-Type': 'application/json'}
        );
        setIsLoading(false)
        SuccessModal(responseData.data.message);
    }catch(error){
        setIsLoading(false);
        setError(error.message || 'Something went wrong, please try again.');

    }
    }

    
    return (   
        <React.Fragment>
        <SuccessModal error={success} onClear={successHandler} />
        <ErrorModal error={error} onClear={successHandler} />
        {isLoading && <LoadingSpinner asOverlay />}
        <GroupDetail/>
    <div className="group_form_div">
		<center>
            
            <NavLink className="request_btns" to={`/requestsource/${gid}`}>Request/Add Source</NavLink>
            <NavLink className="request_btns" to={`/groupdetails/${gid}`}>Member Details</NavLink>
            <button className="leave_group_btn" button  onClick={() => letlev()}>
                Leave Group
            </button>
        </center>
    </div>
    </React.Fragment>
    );
  
};

export default JoinGroupAuth;