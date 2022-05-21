import React, { useEffect, useState,Component} from 'react';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const  Newgroup = ()=>{
    const {sendRequest} = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const [groupName,setName]=useState("");
    const [description,setDesc]=useState("");
    const [genre,setGenre]=useState("");
    const [duration,setDuration]=useState("");
    const [amount,setAmount]=useState("");

    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            setIsLoading(true);

            var userId = localStorage.getItem('__react_session__');
            userId = await JSON.parse(userId)
            userId = userId['userId']
            var body={"groupName":groupName,"description":description,"genre":genre,"duration":duration,"amount":amount};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `http://localhost:5001/api/groups/create/${userId}`,"POST",body,{
                    'Content-Type': 'application/json'
            });
            if(responseData['status']!=200 && responseData['status']!=202){
                throw responseData.error;
            }
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
        {isLoading && <LoadingSpinner asOverlay />}  
    <div className="group_form_div">
		<center>
            <form  action="/" id="event_form"  name="event_form" className="auth_form" onSubmit={onSubmitform}>
                <h2 className="form_heading">
                    Create a New Group 
                </h2> 
                <hr/>
                <label for="groupName" className="labels">
                    Group Name<span > * </span> 
                </label>
                <br/>
                <input type="text" name="groupName" className="inputs" value={groupName} placeholder="Enter a Unique group name" onChange={e =>setName(e.target.value)} required />
                <br/><br/>
                <label for="description" className="labels">
                    Description <span > * </span>
                </label> 
                <br/>
                <textarea name="description" className="text" value={description} rows="7" cols="45" placeholder="Give a brief insight of your past acheivements "onChange={e =>setDesc(e.target.value)} required/>
                <br/><br/>
                <label for="genre" className="labels">
                    Genre <span > * </span> 
                </label><br/>
                <select name="genre" className="select" onChange={e =>setGenre(e.target.value)}>
                    <option></option>
                    <option value="Gold/Silver" className="options">Gold/Silver</option>
                    <option value="Stock" className="options">Stock</option>
                    <option value="Cryptocurrency" className="options">Cryptocurrency</option>
                    <option value="Currency Exchange" className="options">Currency Exchange</option>
                </select>
                <br/><br/> 
                <label for="duration" className="labels">
                    Minimum Duration of Investment <span > * </span> 
                </label>
                <br/>
                <select name="duration" className="select" onChange={e =>setDuration(e.target.value)}>
                    <option></option>
                    <option value="1" className="options">1 Month</option>
                    <option value="3" className="options">3 Months</option>
                    <option value="6" className="options">6 Months</option>
                    <option value="12" className="options">1 Year</option>
                    <option value="60" className="options">5 Years</option>
                </select>  
                <br/><br/> 
                <label for="amount" className="labels">
                    Minimum Amount<span > * </span> 
                </label>
                <br/>
                <input type="number" name="amount" className="inputs" value={amount} step="50" min="50"placeholder="Starting value of Min Amount:Rs 50" onChange={e =>setAmount(e.target.value)} required />
                <br/><br/>
                <button type="submit" className="confirm_btns" >
                    Create Group
                </button>
            </form> 
        </center>
    </div>
    </React.Fragment>
    );
};

export default Newgroup;