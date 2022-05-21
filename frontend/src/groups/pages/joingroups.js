import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SuccessModal from '../../shared/components/UIElements/Success';
import GroupDetail from './groupdetail';

const  JoinGroupAuth = ()=>{
   const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
    const [amount,setAmount]=useState("");
    const gid = useParams().gid;
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);

            var userId = localStorage.getItem('__react_session__');
            userId = await JSON.parse(userId)
            userId = userId['userId']
            var body={"amount":amount,"groupId":gid};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://localhost:5001/api/groups/join/${userId}`,"POST",body,{
                    'Content-Type': 'application/json'
                }
            );
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            setSuccess(responseData.data.message || 'Something went wrong, please try again.');
            setIsLoading(false);
            setError(false);
            // window.location="/";
        }catch(err){
            setIsLoading(false);
            setError(true);
            setSuccess(err.message || 'Something went wrong, please try again.');
        }
    }
    const successHandler = () => {
        setSuccess(null);
        setError(null);
      };
    return (   
        <React.Fragment>
            {error ?<ErrorModal error={success} onClear={successHandler} /> : <SuccessModal error={success} onClear={successHandler} />}
        <SuccessModal error={success} onClear={successHandler} />
        {isLoading && <LoadingSpinner asOverlay />}
        
    <div className="group_form_div">
		<center>
            <form  action="/" id="event_form"  name="event_form" className="join_form" onSubmit={onSubmitform}>
                                    {/* form header */}
                <h2 className="form_heading">
                    JOIN THIS GROUP 
                </h2> 
                <input type="number" name="amount" className="join_inputs" value={amount} step="50" min="50"placeholder="Starting value of Min Amount:Rs 50" onChange={e =>setAmount(e.target.value)} required />
                <br/><br/>
                <button type="submit" className="join_btns">
                    Join Group
                </button>
            </form> 
                

        </center>
    </div>
    <GroupDetail/>
    </React.Fragment>
    );
  
};

export default JoinGroupAuth;