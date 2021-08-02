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
          Header: 'My Groups',
          columns: [  
            {
              Header: ' Source Name',
              accessor: 'name',
            },
            {
              Header: 'Suggestor Name',
              accessor: 'suggestorName',
            },
            {
              Header: 'Target Price',
              accessor: 'targetPrice',
            },
            {
              Header: 'Unit Purchase',
              accessor: 'unitsPurchase',
            },
            {   
                width:30,
                Header: 'Aceept/Reject',
                accessor: '_id',
                Cell: ({ cell }) => (
                  <Fragment>
                  <button>
                   <NavLink to={`/request/${cell.row.values._id}/${true}`}>Accept </NavLink>
                  </button>
                  <button>
                  <NavLink to={`/request/${cell.row.values._id}/${false}`}>Reject </NavLink>
                 </button>
                 </Fragment>
                )
            }
          ],
        },
      ],
      []
    );
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState();
  
    const {sendRequest} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    var userid = localStorage.getItem('__react_session__');
    userid = JSON.parse(userid)
    userid = userid['userid']
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest(
            `http://stool-back.herokuapp.com/api/source/approve/${userid}`,"POST"
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