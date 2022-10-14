import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import GroupDetail from './groupdetail';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const  RequestSource = ()=>{

    const {sendRequest} = useHttpClient();
   const [isLoading, setIsLoading] = useState(false);
   const [success, setSuccess] = useState();
   const [error, setError] = useState();
 
    const [name,setName]=useState("");
    const [marketplace,setMarketplace]=useState("");
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
              console.log(responseData)
            setSuccess(responseData.data.message || 'Something went wrong, please try again.');
            setIsLoading(false);
            setError(false);
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
   
    return (   
        <React.Fragment>
            <SuccessModal error={success} onClear={successHandler} />
            <ErrorModal error={error} onClear={successHandler} />

            <div className="group_form_div">
        <center>
        <form  action="/" id="event_form"  name="event_form" className="request_form" onSubmit={onSubmitform}>
                                    {/* form header */}
                <h2 className="request_heading">
                    ADD SOURCE 
                </h2> 
                <hr/>
                <label className="labels">
                    Name<span > * </span> 
                </label>
                <br/>
                <input type="text" name="name" className="request_inputs" value={name} onChange={e =>setName(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Market Place 
                </label>
                <br/>
                <input type="text" name="marketplace" className="request_inputs" value={marketplace} onChange={e =>setMarketplace(e.target.value)} />
                <br/><br/>
                <label className="labels">
                    Price<span > * </span> 
                </label>
                <br/>
                <input type="number" name="price" className="request_inputs" value={price} onChange={e =>setPrice(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Target Price<span > * </span> 
                </label>
                <br/>
                <input type="number" name="targetPrice" className="request_inputs" value={targetPrice} onChange={e =>setTragetprice(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Units Purchase<span > * </span> 
                </label>
                <br/>
                <input type="number" name="unitsPurchase" className="request_inputs" value={unitsPurchase} onChange={e =>setUnitspurchase(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Details<span > * </span> 
                </label>
                <br/>
                <input type="text" name="details" className="request_inputs" value={details} onChange={e =>setDetails(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Duration (in months)<span > * </span> 
                </label>
                <br/>
                <input type="number" name="duration" className="request_inputs" value={duration} onChange={e =>setDuration(e.target.value)} required />
                <br/><br/>
                <button type="submit" className="request_btns">
                    REQUEST/ADD
                </button>
            </form> </center>
                
            </div>
    </React.Fragment>
    );
  
};

export default RequestSource;