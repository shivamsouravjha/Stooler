import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';

import makeData from './makeData'

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
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: '_id',
          },
          {
            Header: 'Last Name',
            accessor: 'members',
          },
    
        //    {
        //     Header: 'Age',
        //     accessor: 'age',
        //   },
        //   {
        //     Header: 'Visits',
        //     accessor: 'visits',
        //   },
        //   {
        //     Header: 'Status',
        //     accessor: 'status',
        //   },
        //   {
        //     Header: 'Profile Progress',
        //     accessor: 'progress',
        //   },
        ],
      },
    ],
    []
  )
  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5001/api/groups/getgroups'
        );
        console.log(loadedUsers)
        console.log(responseData.data)
        setLoadedUsers(responseData.data);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
//    const works = async event =>{
//    const response = await fetch('http://localhost:5001/api/groups/getgroups', {
//           method: 'get',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//         });
//         const datainJson = await resoinse.json();
//         console.log(datainJson)
//     }
    // console.log(works(20))
  const data = React.useMemo(() => loadedUsers, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default Group
