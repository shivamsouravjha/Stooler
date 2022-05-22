import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './common.css';

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

function Debt() {
  const [compLoading, setCompLoading] = useState(true);
  const columns = React.useMemo(
    () => [
    
      {
        Header: 'AVAILABLE Funds',
        columns: [
         
          {
            Header: 'AMC',
            accessor: 'amc',
            
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Purchase Allowed',
            accessor: 'purchase_allowed',
          },
          {
            Header: 'Redemption Allowed',
            accessor: 'redemption_allowed',
          },
          {
            Header: 'Minimum Purchase Amount',
            accessor: 'minimum_purchase_amount',
          },  
        ],
      },
    ],
    []
  );

  const [error, setError] = useState();
  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        var body={"scheme_type": "Debt"};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
          `http://localhost:5001/Api/source/getcatalogue/`,"POST",body,{
            'Content-Type': 'application/json'});
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

export default Debt;