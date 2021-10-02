import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./Auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';

const  EditSource = ()=>{
   const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
    const [amount,setamount]=useState();
    const sid = useParams().sid;
    var userId = localStorage.getItem('__react_session__');
    userId = JSON.parse(userId)
    userId = userId['userId']
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);
            var body={"sum":amount};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `https://stool-back.herokuapp.com/api/users/addsum/account/${userId}/`,"POST",body,{
                    'Content-Type': 'application/json'
                }
            );
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            setSuccess(responseData.data.status || 'Something went wrong, please try again.');
            setIsLoading(false);
            setError(false);
            // window.location="/";
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
                    <form  action="/" id="event_form"  name="event_form" className="request_form" onSubmit={onSubmitform}>
                                            {/* form header */}
                        <h2 className="form_heading">
                            Add Money to your account
                        </h2> 
                        <hr className="investment_hr"/>
                        <br/>
                        <label className="labels">
                         Enter amount<span > * </span> 
                        </label>
                        <input type="number" name="amount" className="request_inputs" value={amount} placeholder="New Units" onChange={e =>setamount(e.target.value)} required />
                        <br/><br/>
                        <button type="submit" className="join_btns">
                            Done
                        </button>
                    </form> 
                        

                </center>
            </div>)
    </React.Fragment>
    );
  
};

export default EditSource;