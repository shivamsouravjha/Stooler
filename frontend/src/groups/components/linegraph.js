import {Line} from 'react-chartjs-2';
import React from 'react'  

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
        <div>
            <Line
                data={{
                    labels: deal_number,
                    datasets: [
                        {
                        label: '# of votes',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                          ],
                          borderWidth: 1,
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
    )
};

export default linechart