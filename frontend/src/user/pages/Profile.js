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
            <Link to={`/addmoney`} > <button className="search_button">Add Money</button></Link>
            <br/>
            <br/>
            <Transaction/>
        </div>
    )
};
    
export default Profile