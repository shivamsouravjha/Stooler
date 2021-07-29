import React, { useEffect, useState,Component} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import "./auth.css";
import JoinGroup from './getjoinGroups';
import { useHttpClient } from '../../shared/hooks/http-hook';


const  JoinGroupAuth = ()=>{
   const {sendRequest} = useHttpClient();

    const [amount,setAmount]=useState("");
    const gid = useParams().gid;
    const onSubmitform = async e =>{
        e.preventDefault();
        try{   
            var userid = localStorage.getItem('__react_session__');
            userid = await JSON.parse(userid)
            userid = userid['userid']
            var body={"amount":amount,"groupId":gid};
            body = JSON.stringify(body)
            const responseData = await sendRequest(
                `https://stool-back.herokuapp.com/api/groups/join/${userid}`,"POST",body,{
                    'Content-Type': 'application/json'
            }
              );
            console.log(responseData)
        }catch(err){
            console.log(err)
        }
    }
    return (   
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
    );
  
};

export default JoinGroupAuth;