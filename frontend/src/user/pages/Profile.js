import React, { useState, useCallback } from 'react';
import '../../App.css';
import PieChart from '../components/PieChart';
import Users from './Users';

const Profile = () => {
    
    return (
        <div className="App">
            <Users/>
            <PieChart/>
        </div>
    )
};
    
export default Profile