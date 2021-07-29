import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';


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

            var userid = localStorage.getItem('__react_session__');
            userid = await JSON.parse(userid)
            userid = userid['userid']
            var body={"amount":amount,"groupId":gid};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://localhost:5000/api/groups/join/${userid}`,"POST",body,{
                    'Content-Type': 'application/json'
            }
              );
              console.log(responseData)
            setSuccess(responseData.data.message || 'Something went wrong, please try again.');
            setIsLoading(false);
            setError(false);

        }catch(err){
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again.');
        }
    }
    const successHandler = () => {
        setSuccess(null);
        setError(null);
      };
    return (   
        <React.Fragment>
        <SuccessModal error={success} onClear={successHandler} />
    <div className="group_form_div">
		<center>
            <form  action="/" id="event_form"  name="event_form" className="auth_form" onSubmit={onSubmitform}>
                                    {/* form header */}
                <h2 className="form_heading">
                    Join a New Group 
                </h2> 
                <input type="number" name="amount" className="inputs" value={amount} step="50" min="50"placeholder="Starting value of Min Amount:Rs 50" onChange={e =>setAmount(e.target.value)} required />
                <br/><br/>
                <button type="submit" className="confirm_btns" >
                    Join Group
                </button>
            </form> 
                

        </center>
    </div>
    </React.Fragment>
    );
  
};

export default JoinGroupAuth;