import React,{useEffect,useState,Fragment} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

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



function GroupSource() {
    const [compLoading, setCompLoading] = useState(true); 
    const columns = React.useMemo(
      () => [
        {
          Header: 'MY GROUPS',
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
                Header: 'Accept / Reject',
                accessor: '_id',
                Cell: ({ cell }) => (
                  <Fragment>
                  
                   <NavLink className="accept_source_link edit_source_link" to={`/request/${cell.row.values._id}/${true}`}>Accept </NavLink> &nbsp;
                  
                  <NavLink  className="accept_source_link delete_source_link" to={`/request/${cell.row.values._id}/${false}`}>Reject </NavLink>
                 
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
    var userId = localStorage.getItem('__react_session__');
    userId = JSON.parse(userId)
    userId = userId['userId']
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5001/api/source/approve/${userId}`,"POST"
          );
          if(responseData['status']!=200 && responseData['status']!=202){
            throw responseData.error;
          }
          console.log(responseData.data.groups)
          const dataResponse = responseData.data.groups;
          setLoadedUsers(dataResponse);
          setCompLoading(false)
        } catch (err) {
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