import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import '../../groups/pages/getjoinGroups.css';
const Styles = styled.div`
  padding: 0rem;

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
      padding: 0.2rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
      
    }
    tbody td {
      
      text-align:center;
      padding: 0.2rem;
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
    <center>
    <table {...getTableProps()} className="join_group_table">
      <thead className="join_group_header" >
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
    </table> </center>
  )
}



function GroupSource() {
    const [compLoading, setCompLoading] = useState(true); 
    const columns = React.useMemo(
      () => [
        {
          Header: 'MY TRANSACTIONS ',
          columns: [  
         
            {
              Header: ' Group',
              accessor: 'groupId',
              Cell: e => <NavLink className="transaction_link" to={`/yourgroup/${e.value}`}> Click here </NavLink>
            },
            {
              Header: 'Deposited',
              accessor: 'deposited_amount',
            },
            {
              Header: 'Returned Amt',
              accessor: 'returned_amount',
            },
            {
              Header: 'Due Amount',
              accessor: 'due_amount',
            },
            {
              Header: 'Status',
              accessor: 'type',
            }
          ],
        },
      ],
      []
    );
    
    const {sendRequest} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            setCompLoading(true)
            var userId = localStorage.getItem('__react_session__');
            userId = await JSON.parse(userId)
            userId = userId['userId']
            const responseData = await sendRequest(
            `http://localhost:5001/api/users/account/data/${userId}`,"POST"
            );
            const dataResponse = responseData.data;
            console.log(dataResponse);
            setLoadedUsers(dataResponse.transaction);
            setCompLoading(false)
        } catch (err) {    
                console.log(err)
        }
        };
        fetchUsers();
    }, []);
    var data = React.useMemo(() => loadedUsers, [loadedUsers]);
    return (
          <Fragment>          
            {compLoading ?<LoadingSpinner asOverlay /> : (!data ? <h1>No data </h1>:(
                    <Styles>
                        <Table columns={columns} data={data} />
                    </Styles>
            ))}
          </Fragment>
        );
  }
  
  export default GroupSource;