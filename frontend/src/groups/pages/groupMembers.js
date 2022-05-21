import React,{useEffect,useState,Fragment} from 'react'
import { Link,useParams } from 'react-router-dom';
import styled from 'styled-components'
import "./main.css";
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import SuccessModal from '../../shared/components/UIElements/Success';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

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
    padding: 0.3rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    :last-child {
      border-right: 0;
    }
    
  }
  tbody td {
    
    text-align:center;
    padding: 0.3rem;
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
          <tr {...headerGroup.getHeaderGroupProps()}>
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
            <tr className="join_group_row" {...row.getRowProps()}>
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

function GroupMembers() {
  const [compLoading, setCompLoading] = useState(true);
  const [newadm,setnewadm] =useState();
  const [success, setSuccess] = useState();

  var userId = localStorage.getItem('__react_session__');
  userId = JSON.parse(userId)
  userId = userId['userId']
  const mkadm = async e=>{
    try{
      setCompLoading(true)
      var body={"gid":gid,"newOwner":e};
      body = JSON.stringify(body)
      const responseData = await sendRequest(
          `http://localhost:5001/api/groups/transferownership/removegroup/${userId}/`,"POST",body,{
            'Content-Type': 'application/json'}
      );
      setCompLoading(false);
      setSuccess(responseData.data.message)
    }catch(error){
        setCompLoading(false);
        setError(error.message || 'Something went wrong, please try again.');
    }
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'Group Members',
        columns: [
            {
                Header: ' Member Name',
                accessor: 'userId.name',
                Cell: ({ cell }) =>(
                  <Fragment>
                    {setnewadm(cell.value)}
                    {cell.value}
                  </Fragment>
                )
              },
              {
                Header: 'Deposited Fund',
                accessor: 'deposited_amount',
              },
          {
            Header: 'Group Details',
            accessor: 'groupId.groupOwner',
            Cell: ({ cell }) =>(
              <Fragment>
                {cell.value===userId ? (
                    <button className="make_admin" button  onClick={() => mkadm(cell.row.original.userId._id)}>
                      Make Admin
                    </button>                  
                    ):
                  (
                    (cell.row.original.userId._id === cell.value? <h5>Group Owner</h5> : <h5>Member</h5>)

                    )
                }
              </Fragment>
            )
          },
        ],
      },
    ],
    []
  );
  const [error, setError] = useState();

  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  var userId = localStorage.getItem('__react_session__');
  userId = JSON.parse(userId);
  userId = userId['userId'];
  const gid = useParams().gid;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/groups/groupmembers/${gid}`,"POST"
        );
        if(responseData['status']!=200 && responseData['status']!=202){
          throw responseData.error;
        }
        const dataResponse = responseData.data.userId;
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
  const successHandler = () => {
    setSuccess(null);
    setError(null);
  };
  var data = React.useMemo(() => loadedUsers, [loadedUsers]);
  return (
        <Fragment>          
 <SuccessModal error={success} onClear={successHandler} />
 <ErrorModal error={error} onClear={successHandler} />
    {compLoading ?<LoadingSpinner asOverlay /> : (!data ? <h1>No data </h1>:(
            <Styles>
              <Table columns={columns} data={data} />
            </Styles>
    ))}
    
        </Fragment>
      );
}

export default GroupMembers;