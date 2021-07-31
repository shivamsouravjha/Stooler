import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Styles = styled.div`
  padding: 1rem;

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

    th,
    td {
      margin: 0;
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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Group() {
  const [compLoading, setCompLoading] = useState(true);
  const columns = React.useMemo(
    () => [
      {
        Header: 'My Groups',
        columns: [
          {
            Header: 'ID',
            accessor: '_id',
            Cell: e => <button><NavLink to={`/groupdetail/${e.value}`}>{e.value} </NavLink></button>
          },  
          {
            Header: ' Group Name',
            accessor: 'groupName',
          },
          {
            Header: 'My Groups',
            accessor: 'groupOwner',
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
        var userid = localStorage.getItem('__react_session__');
        userid = await JSON.parse(userid)
        userid = userid['userid']
        const responseData = await sendRequest(
          `http://stool-back.herokuapp.com/api/users/account/${userid}`
        );
        console.log(responseData.data.groups)
        const dataResponse = responseData.data.groups;
        setLoadedUsers(dataResponse);
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
        var userid = localStorage.getItem('__react_session__');
        userid = await JSON.parse(userid)
        userid = userid['userid']
        var body={"groupName":groupName,"genre":genre,"duration":duration,"amount":amount};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `http://stool-back.herokuapp.com/api/users/account/${userid}`,"POST",body,{
                'Content-Type': 'application/json'
        });
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
            <form  action="/" id="event_form"  name="event_form" className="auth_form" onSubmit={onSubmitform}>
                <h4>
                    Search Group 
                </h4> 
                <hr/>
                <label for="groupName">
                    By Group Name<span > * </span> 
                </label>
                <input type="text" name="groupName"  value={groupName} placeholder="Enter a Unique group name" onChange={e =>setName(e.target.value)}  />
                <br/>
                <label for="genre">
                    By Genre <span > * </span> 
                </label>
                <select name="genre" onChange={e =>setGenre(e.target.value)}>
                    <option></option>
                    <option value="Gold/Silver" className="options">Gold/Silver</option>
                    <option value="Stock" className="options">Stock</option>
                    <option value="Cryptocurrency" className="options">Cryptocurrency</option>
                    <option value="Currency Exchange" className="options">Currency Exchange</option>
                </select>
                <br/>
                <label for="duration">
                    Minimum Duration of Investment <span > * </span> 
                </label>
                <select name="duration" onChange={e =>setDuration(e.target.value)}>
                    <option></option>
                    <option value="1" className="options">1 Month</option>
                    <option value="3" className="options">3 Months</option>
                    <option value="6" className="options">6 Months</option>
                    <option value="12" className="options">1 Year</option>
                    <option value="60" className="options">5 Years</option>
                </select>  
                <br/>
                <label for="amount" >
                    By Minimum Amount<span > * </span> 
                </label>
                <input type="number" name="amount" value={amount} placeholder="Starting value of Min Amount:Rs 50" onChange={e =>setAmount(e.target.value)}  />
                <br/>
                <button type="submit">
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

export default Group