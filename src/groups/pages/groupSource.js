import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';
import GroupDetail from './groupdetail';

const  JoinGroupAuth = ()=>{
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
            var userid = localStorage.getItem('__react_session__');
            userid = await JSON.parse(userid)
            userid = userid['userid']
            var body={"name":name,"price":price,"unitsPurchase":unitsPurchase,"targetPrice":targetPrice,"details":details,"duration":duration};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `https://stool-back.herokuapp.com/api/source/add/${gid}/${userid}`,"POST",body,{
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
            setSuccess(err.message || 'Something went wrong, please try again.');
        }
    }
    const successHandler = () => {
        setSuccess(null);
        setError(null);
      };
    const letlev = async e =>{
        e.preventDefault();
        setIsLoading(true)
        var userid = localStorage.getItem('__react_session__');
        userid = await JSON.parse(userid)
        userid = userid['userid']
        const responseData = await sendRequest(
            `https://stool-back.herokuapp.com/api/source/delete/sources/${gid}/${userid}/`,"POST"
        );
        console.log(responseData,gid)
        setIsLoading(false)
    }
    return (   
        <React.Fragment>
        <SuccessModal error={success} onClear={successHandler} />
        {isLoading && <LoadingSpinner asOverlay />}
        <GroupDetail/>
    <div className="group_form_div">
		<center>
            <button className="leave_group_btn" button  onClick={() => letlev()}>
                Leave Group
            </button>
            <form  action="/" id="event_form"  name="event_form" className="auth_form" onSubmit={onSubmitform}>
                                    {/* form header */}
                <h2 className="form_heading">
                    ADD SOURCE 
                </h2> 
                <label className="labels">
                    Name<span > * </span> 
                </label>
                <br/>
                <input type="text" name="name" className="inputs" value={name} onChange={e =>setName(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Market Place 
                </label>
                <br/>
                <input type="text" name="marketplace" className="inputs" value={marketplace} onChange={e =>setMarketplace(e.target.value)} />
                <br/><br/>
                <label className="labels">
                    Price<span > * </span> 
                </label>
                <br/>
                <input type="number" name="price" className="inputs" value={price} onChange={e =>setPrice(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Target Price<span > * </span> 
                </label>
                <br/>
                <input type="number" name="targetPrice" className="inputs" value={targetPrice} onChange={e =>setTragetprice(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Units Purchase<span > * </span> 
                </label>
                <br/>
                <input type="number" name="unitsPurchase" className="inputs" value={unitsPurchase} onChange={e =>setUnitspurchase(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Details<span > * </span> 
                </label>
                <br/>
                <input type="text" name="details" className="inputs" value={details} onChange={e =>setDetails(e.target.value)} required />
                <br/><br/>
                <label className="labels">
                    Duration time in month<span > * </span> 
                </label>
                <br/>
                <input type="number" name="duration" className="inputs" value={duration} onChange={e =>setDuration(e.target.value)} required />
                <br/><br/>
                <button type="submit" className="confirm_btns">
                    REQUEST/ADD
                </button>
            </form> 
                

        </center>
    </div>
    </React.Fragment>
    );
  
};

export default JoinGroupAuth;