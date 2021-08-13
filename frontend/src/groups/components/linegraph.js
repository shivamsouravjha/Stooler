import {Line} from 'react-chartjs-2';
import React from 'react'  
import './line.css';

// export default Users;

const linechart = props => {
    var profit=[];
    var loss=[];
    var data=[];
    var data_loss =  props.graph[1].loss;
    for(var j in data_loss){
        data_loss[j]*=-1;
    }
    var data_profit = props.graph[0].profit;
    data = data_loss.concat(data_profit);
    var deal_number = [];
    for(var i in data){
        deal_number.push(i);
    }
    return (
        <center>
        <div class="css_chart">
            <Line
                data={{
                    labels: deal_number,
                    datasets: [
                        {
                        label: 'loss_Gain',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 255, 255, 1)',
                          ],
                          borderColor: [
                            'rgba(238, 75, 43, 1)',
                            'rgba(54, 162, 235, 1)',
                          ],
                          borderWidth: 2,
                        },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                    yAxes: [
                        {
                        ticks: {
                            beginAtZero: true,
                        },
                        },
                    ],
                    },
                    legend: {
                    labels: {
                        fontSize: 25,
                    },
                    },
                }}
            />
        </div>
        </center>
    )
};

export default linechart