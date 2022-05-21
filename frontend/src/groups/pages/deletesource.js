import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const  EditSource = ()=>{
   const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
    const [sellingPrice,setsellingPrice]=useState();
    const sid = useParams().sid;
    var userId = localStorage.getItem('__react_session__');
    userId = JSON.parse(userId)
    userId = userId['userId']
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);
            var body={"sellingPrice":sellingPrice};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://localhost:5001/api/source/delete/sources/${sid}/${userId}/`,"POST",body,{
                    'Content-Type': 'application/json'
                }
            );
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
            setSuccess(responseData.data.message || 'Something went wrong, please try again.');
            setIsLoading(false);
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
        <ErrorModal error={error} onClear={successHandler} />
            <div className="group_form_div">
                <center>
                    <form  action="/" id="event_form"  name="event_form" className="request_form" onSubmit={onSubmitform}>
                                            {/* form header */}
                        <h2 className="form_heading">
                            Selling Price of  the source
                        </h2> <hr className="investment_hr"/>
                        <br/>
                        
                        <input type="number" name="sellingPric" className="request_inputs" value={sellingPrice} placeholder="Selling Price of Each unit" onChange={e =>setsellingPrice(e.target.value)} required />
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