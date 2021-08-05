import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';

const  EditSource = ()=>{
   const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
    const [unitsPurchase,setUnitpurchase]=useState();
    const sid = useParams().sid;
    var userid = localStorage.getItem('__react_session__');
    userid = JSON.parse(userid)
    userid = userid['userid']
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);
            var body={"unitsPurchase":unitsPurchase};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://stool-back.herokuapp.com/api/source/edit/sources/${sid}/${userid}/`,"POST",body,{
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
            setSuccess(err.message || 'Something went wrong, please try again.');
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
                            Edit the Units
                        </h2> 
                        <br/>
                        <input type="number" name="amount" className="inputs" value={unitsPurchase} placeholder="New Units" onChange={e =>setUnitpurchase(e.target.value)} required />
                        <br/><br/>
                        <button type="submit" className="confirm_btns">
                            Done
                        </button>
                        <br/><br/>
                        <button type="submit" className="confirm_btns">
                            Delete
                        </button>
                    </form> 
                        

                </center>
            </div>)
    </React.Fragment>
    );
  
};

export default EditSource;