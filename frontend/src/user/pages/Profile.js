import React from 'react';
import '../../App.css';
import PieChart from '../components/PieChart';
import Users from './Users';
import { Link } from 'react-router-dom';
import Transaction from './transaction'

const Profile = () => {
    
    return (
        <div className="App">
            <Users/>
            <PieChart/>
            <br/>

            <div className="group">
            <ul className="group-links">
            <li><Link to={`/addmoney`} > <button className="group_button">ADD Money</button></Link>
            </li>
            </ul></div>

            <br/>
            <br/>
            <Transaction/>
        </div>
    )
};
    
export default Profile