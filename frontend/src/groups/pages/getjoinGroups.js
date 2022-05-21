import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import SuccessModal from '../../shared/components/UIElements/Success';

import './searchgroup.css';
import './getjoinGroups.css';
const Styles = styled.div`
  
padding:0rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th{
      
      text-align:center;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
      
    }
    tbody td {
      
      text-align:center;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    
    <table {...getTableProps()} className="join_group_table">
      <thead className="join_group_header">
        {headerGroups.map(headerGroup => (
          <tr  {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="join_group_head" {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="join_group_body" {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr  className="join_group_row" {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td className="join_group_data" {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


function JoinGroup() {
  const [compLoading, setCompLoading] = useState(true);
  const columns = React.useMemo(
    () => [
    
      {
        Header: 'AVAILABLE GROUPS',
        columns: [
         
          {
            Header: 'Group Name',
            accessor: 'groupName',
            
          },
         
          {
            Header: 'Group Type',
            accessor: 'genre',
          },
          {
            Header: 'Total Cash-Flow',
            accessor: 'totalsum',
          },
          {
            Header: 'Minimum Amount',
            accessor: 'amount',
          },
          {
            Header: 'Group Details',
            accessor: '_id',
            Cell: e => <NavLink className="join_group_link" to={`/group/${e.value}`}> Click here </NavLink>
          },
            
        ],
      },
    ],
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const [groupName,setName]=useState("");
  const [genre,setGenre]=useState("");
  const [duration,setDuration]=useState("");
  const [amount,setAmount]=useState("");
  const [error, setError] = useState();

  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        const responseData = await sendRequest(
          `http://localhost:5001/api/groups/getjoingroups/${userId}`,"POST"
                    );
          if(responseData['status']!=200 && responseData['status']!=202){
            throw responseData.error;
        }
        console.log(responseData)
        setLoadedUsers(responseData.data);
        setCompLoading(false)
      } catch (err) {
        console.log(err)
        setCompLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
      }
    };
    fetchUsers();
  }, []);
  const onSubmitform = async e =>{
    e.preventDefault();
    try{   
      setCompLoading(true);
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        var body={"groupName":groupName,"genre":genre,"duration":duration,"amount":amount};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `http://localhost:5001/api/groups/getjoingroups/${userId}`,"POST",body,{
                'Content-Type': 'application/json'
        });
        if(responseData['status']!=200 && responseData['status']!=202){
          throw responseData.error;
      }
        const dataResponse = responseData.data;

        setLoadedUsers(dataResponse);

        console.log(responseData.data)
        setCompLoading(false);        
    }catch(err){
      console.log(err)
      setCompLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
    }
}

  var data = React.useMemo(() => loadedUsers, [loadedUsers]);
  return (
    <Fragment>          
      <div className="group_form_div">
<center>
        <form  action="/" id="event_form"  name="event_form" className="search_form" onSubmit={onSubmitform}>
            <h2 className="search_header">
                Filter Groups by
            </h2> 
            <hr/>
            <label className="search_label" for="groupName">
                 Group Name :
            </label>
            <input className="search_input" type="text" name="groupName"  value={groupName} placeholder="Enter the GroupName" onChange={e =>setName(e.target.value)}  />
            
            &nbsp; 
            
          <label className="search_label" for="genre">
                 Genre :
            </label>
            <select className="search_input" name="genre" onChange={e =>setGenre(e.target.value)}>
                <option></option>
                <option value="Gold/Silver" className="options">Gold/Silver</option>
                <option value="Stock" className="options">Stock</option>
                <option value="Cryptocurrency" className="options">Cryptocurrency</option>
                <option value="Currency Exchange" className="options">Currency Exchange</option>
            </select>
            &nbsp;
            <label className="search_label" for="duration">
                Minimum Duration of Investment :
            </label>
            <select className="search_input" name="duration" onChange={e =>setDuration(e.target.value)}>
                <option></option>
                <option value="1" className="options">1 Month</option>
                <option value="3" className="options">3 Months</option>
                <option value="6" className="options">6 Months</option>
                <option value="12" className="options">1 Year</option>
                <option value="60" className="options">5 Years</option>
            </select>  
            &nbsp;
            <label className="search_label" for="amount" >
                 Minimum Amount :
            </label>
            <input className="search_input" type="number" name="amount" value={amount} placeholder="Enter Min Amount" onChange={e =>setAmount(e.target.value)}  />
            <br/> <br/>
            <button type="submit" className="search_button">
                Search
            </button>
        </form> 
    </center>
</div>
{compLoading ?<LoadingSpinner asOverlay /> : (!data ? <h1>No data </h1>:(
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
))}
    </Fragment>
  );
}

export default JoinGroup;