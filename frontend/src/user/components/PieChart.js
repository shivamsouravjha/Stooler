import {Pie} from 'react-chartjs-2';
import React,{useEffect,useState} from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';

// export default Users;

const PieChart = () => {
    const {sendRequest} = useHttpClient();
  const [compLoading, setCompLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setCompLoading(true)
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        console.log("Fd")
        const responseData = await sendRequest(
          `http://localhost:5001/api/users/account/data/${userId}`,"POST"
        );
        console.log("responseData")
        if(responseData['status']!==200 && responseData['status']!==202){
          throw responseData.error;
        }
        const dataResponse = responseData.data.shares.map((val)=>{
            return val.amount;
        });
        setLoadedUsers(dataResponse);
        setCompLoading(false)
        console.log(loadedUsers)
      } catch (err) {
        console.log(err)
      }
    };
    fetchUsers();
  }, []);
  var data = [];
  if(!compLoading){
    data = loadedUsers
    }
    return (
        <div>
            <Pie
                data={{
                    labels: ['Gold/Silver', 'Stock', 'Cryptocurrency', 'Currency Exchange'],
                    datasets: [
                        {
                        label: '# of votes',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 1,
                        },
                    ],
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    // scales: {
                    // yAxes: [
                    //     {
                    //     ticks: {
                    //         beginAtZero: true,
                    //     },
                    //     },
                    // ],
                    // },
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

export default PieChart