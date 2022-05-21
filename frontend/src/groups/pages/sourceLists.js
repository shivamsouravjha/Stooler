import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useParams } from 'react-router-dom';
import './sourceLists.css';
const Styles = styled.div`
  padding: 0.5rem;

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
      padding: 0.4rem;
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
    <table className="source_list_table" {...getTableProps()}>
      <thead className="source_list_header">
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
            <tr className="source_list_data" {...row.getRowProps()}>
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
 
function SourceDetails(props) {
  const [compLoading, setCompLoading] = useState(true);
  const columns = React.useMemo(
    () => [
      {
        Header: 'GROUP SOURCES',
        columns: [
          
          {
            Header: 'Source Name',
            accessor: 'name',
          },
          {
            Header: 'Target Price',
            accessor: 'targetPrice',
          }, {
            Header: 'Price',
            accessor: 'price',
          },
          {
            Header: 'Units',
            accessor: 'unitsPurchase',
          },
          {
            Header: 'Source Link',
            accessor: '_id',
            Cell: ({ cell }) =>(
            <Fragment>
              <NavLink className="view_source_link" to={`/source/${cell.value}`}>View Source </NavLink> 
              {props.valid==true ? (
                <Fragment>
                  
                    <NavLink className="view_source_link edit_source_link" to={`/editsource/${cell.row.values._id}`}>Edit</NavLink>
                  
                    <NavLink className="view_source_link delete_source_link" to={`/deletesource/${cell.row.values._id}`}>Delete</NavLink>
                  
                </Fragment>
                ):
                (
                  console.log(props)
                )
              }
            </Fragment>
            )
          }
        ],
      },
    ],
    []
  );


  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const gid= useParams().gid;
  var userId;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        console.log("gid");
        const responseData = await sendRequest(
          `http://localhost:5001/api/source/getcompany/${gid}`,"POST"
        );
        if(responseData['status']!=200 && responseData['status']!=202){
          throw responseData.error;
        }
        const dataResponse = responseData.data.source;
        setLoadedUsers(dataResponse);
        setCompLoading(false)
      } catch (err) {
        console.log(err)
        setCompLoading(false);
      }
    };
    fetchUsers();
  }, []);
  
  var data = React.useMemo(() => loadedUsers, [loadedUsers]);
  return (
        <Fragment>          
   {compLoading ?<LoadingSpinner asOverlay /> : (!data ? <h1>No data found </h1>:(
            <Styles>
              <Table columns={columns} data={data} />
            </Styles>
    ))}
        </Fragment>
      );
}

export default SourceDetails;