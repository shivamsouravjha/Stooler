import React, { useEffect, useState,Component} from 'react';

import Input from '../../shared/components/FormElements/Input';
import "./auth.css";


const  GroupAuth = ()=>{
   
    const [groupName,setName]=useState("");
    const [description,setDesc]=useState("");
    const [genre,setGenre]=useState("");
    const [duration,setDuration]=useState("");
    const [amount,setAmount]=useState("");

    const onSubmitform = async e =>{
        e.preventDefault();
        try{
            const body={groupName,description,genre,duration,amount};
            
            const response = await fetch("http://localhost:5000/api/newevents",{
                method:"POST",headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            window.location="/success";
        }catch(err){
            console.log('Error')
        }
    }
    return (   
    <div className="group_form_div">
		<center>
            <form  action="/" id="event_form"  name="event_form" className="auth_form" onSubmit={onSubmitform}>
                                    {/* form header */}
                <h2 className="form_heading">
                    Create a New Group 
                </h2> 
                <hr/>
                                        {/* Label for GROUP_NAME */}
                <label for="groupName" className="labels">
                    Group Name<span > * </span> 
                </label>
                <br/>
                        {/* Input field for GROUP_NAME */}
                <input type="text" name="groupName" className="inputs" value={groupName} placeholder="Enter a Unique group name" onChange={e =>setName(e.target.value)} required />
                <br/><br/>
                        {/* label for DESCRIPTION */}
                <label for="description" className="labels">
                    Description <span > * </span>
                </label> 
                <br/>
                        {/* TEXT field for DESCRIPTION */}
                <textarea name="description" className="text" value={description} rows="7" cols="45" placeholder="Give a brief insight of your past acheivements "onChange={e =>setDesc(e.target.value)} required/>
                <br/><br/>
                        {/* label for GENRE */}
                <label for="genre" className="labels">
                    Genre <span > * </span> 
                </label><br/>
                        {/* SELECT OPTIONS FOR GENRE */}
                <select name="genre" className="select" onChange={e =>setGenre(e.target.value)}>
                    <option value="Gold/Silver" className="options">Gold/Silver</option>
                    <option value="Stock" className="options">Stock</option>
                    <option value="Cryptocurrency" className="options">Cryptocurrency</option>
                    <option value="Currency Exchange" className="options">Currency Exchange</option>
                </select>
                <br/><br/> 
                        {/* label for DURATION */}
                <label for="duration" className="labels">
                    Minimum Duration of Investment <span > * </span> 
                </label>
                <br/>
                        {/* ISELECT OPTIONS FOR DURATION */}
                <select name="duration" className="select" onChange={e =>setDuration(e.target.value)}>
                    <option value="1" className="options">1 Month</option>
                    <option value="3" className="options">3 Months</option>
                    <option value="6" className="options">6 Months</option>
                    <option value="12" className="options">1 Year</option>
                    <option value="60" className="options">5 Years</option>
                </select>  
                <br/><br/> 
                            {/* label for MIN AMOUNT */}
                <label for="amount" className="labels">
                    Minimum Amount<span > * </span> 
                </label>
                <br/>
                            {/* INPUT FIELD FOR MIN AMOUNT */}
                <input type="number" name="amount" className="inputs" value={amount} step="50" min="50"placeholder="Starting value of Min Amount:Rs 50" onChange={e =>setAmount(e.target.value)} required />
                <br/><br/>
                             {/* 'CREATE A GROUP' BUTTON*/}
                <button type="submit" className="confirm_btns" >
                    Create Group
                </button>
            </form> 
                

        </center>
    </div>
    );
  
};

export default GroupAuth;