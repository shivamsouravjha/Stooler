import React,{useEffect,useState,Fragment} from 'react'
import { Link } from 'react-router-dom';
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



function GroupSource() {
    const [compLoading, setCompLoading] = useState(true); 
    const columns = React.useMemo(
      () => [
        {
          Header: 'My Transaction: ',
          columns: [  
            {
              Header: ' Group',
              accessor: 'groupId',
              Cell: e => <NavLink to={`/yourgroup/${e.value}`}> Click here </NavLink>
            },
            {
              Header: 'Deposited',
              accessor: 'deposited_amount',
            },
            {
              Header: 'Returned Amount',
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
            var userid = localStorage.getItem('__react_session__');
            userid = await JSON.parse(userid)
            userid = userid['userid']
            const responseData = await sendRequest(
            `https://stool-back.herokuapp.com/api/users/account/data/${userid}`,"POST"
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