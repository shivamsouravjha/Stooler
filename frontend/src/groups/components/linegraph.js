import {Line} from 'react-chartjs-2';
import React from 'react'  

// export default Users;

const linechart = props => {
    var profit=[];
    var loss=[];
    var data=[];
    var i=0;
    profit = props.graph[0];
    loss = props.graph[1];
    for(var x in loss){
        data[i]=x;
    }
    console.log(profit);
    console.log(loss);
    console.log(data);
    return (
        <div>
            <Line
                data={{
                    labels: ['profit', 'loss'],
                    datasets: [
                        {
                        label: '# of votes',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
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