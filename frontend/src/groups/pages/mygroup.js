import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
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
  const [search, setSearch] = useState('');
  const columns = React.useMemo(
    () => [
      {
        Header: 'My Groups',
        columns: [
          {
            Header: 'ID',
            accessor: '_id',
          },  
          {
            Header: ' Group Name',
            accessor: 'groupName',
          },
          {
            Header: 'My Groups',
            accessor: 'groupOwner',
          }, 
          {
            Header: 'Genre',
            accessor: 'genre',
          }, 
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
        setCompLoading(true);
        var userid = localStorage.getItem('__react_session__');
        userid = await JSON.parse(userid)
        userid = userid['userid']
        const responseData = await sendRequest(
          `http://stool-back.herokuapp.com/api/users/account/${userid}`
        );
        const dataResponse = responseData.data.groups;
        const filterdata = search.length === 0 ? dataResponse : dataResponse.filter(dataResponse => dataResponse.groupName.toLowerCase().includes(search.toLowerCase()));
        console.log(filterdata,"obcd");
        setLoadedUsers(filterdata);
        setCompLoading(false)
      } catch (err) {}
    };
    fetchUsers();
  }, []);
  var data = React.useMemo(() => loadedUsers, [loadedUsers]);
  return (
        <Fragment>
          <div>
          <h3>Search</h3>
            <input 
                type="text" 
                placeholder="Search name" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
          </div>
          {compLoading ?<LoadingSpinner asOverlay /> : (
            <Styles>
              <Table columns={columns} data={data} />
            </Styles>
          )}
        </Fragment>
      );
}

export default Group