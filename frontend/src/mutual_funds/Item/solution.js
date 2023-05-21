import React,{useEffect,useState,Fragment} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './common.css';
import './searchgroup.css';

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

function Solution() {
  const [compLoading, setCompLoading] = useState(true);
  const columns = React.useMemo(
    () => [
    
      {
        Header: 'AVAILABLE FUNDS',
        columns: [
            {
              Header: 'Trading Symbol',
              accessor: 'tradingsymbol',
              
            },
            {
              Header: 'AMC',
              accessor: 'amc',
              
            },
            {
              Header: 'Last Price',
              accessor: 'last_price',
              
            },
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Plan',
              accessor: 'plan',
            },
            {
              Header: 'Settlement Type',
              accessor: 'settlement_type',
            },  
        ],
      },
    ],
    []
  );
  
  const [name,setName]=useState("");
  const [purc_all,setPurc_all]=useState("");
  const [red_all,setRed_all]=useState("");
  const [min_pur_amnt,setMin_pur_amnt]=useState("");
  const [divd_type,setDivd_type]=useState("");
  const [plan,setPlan]=useState("");
  const [setll_ty,setSetll_ty]=useState("");

  const [error, setError] = useState();
  const {sendRequest} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        var userId = localStorage.getItem('__react_session__');
        userId = await JSON.parse(userId)
        userId = userId['userId']
        var body={"scheme_type": "Solution Oriented"};
        body = JSON.stringify(body)
        const responseData = await sendRequest(
          `https://stool-backend.vercel.app/Api/source/getcatalogue/`,"POST",body,{
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
  const onSubmitform = async e =>{
    e.preventDefault();
    try{   
      setCompLoading(true);
        var body={"name":name,
                  "purchase_allowed":purc_all,
                  "redemption_allowed":red_all,
                  "minimum_purchase_amount":min_pur_amnt,
                  "dividend_type":divd_type,
                  "plan":plan,
                  "settlement_type":setll_ty,
                  "scheme_type": "Solution Oriented"
                };
        body = JSON.stringify(body)
        const responseData = await sendRequest(
            `https://stool-backend.vercel.app/Api/source/getcatalogue/`,"POST",body,{
                'Content-Type': 'application/json'
        });
        if(responseData['status']!=200 && responseData['status']!=202){
          throw responseData.error;
      }
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
        <form  action="/" id="event_form"  name="event_form" className="search_form" onSubmit={onSubmitform}>
            <h2 className="search_header">
                Filter Funds by
            </h2> 
            <hr/>
            <label className="search_label" for="name">
                Name :
            </label>
            <input className="search_input" type="text" name="name"  value={name} placeholder="Enter the name" onChange={e =>setName(e.target.value)}  />
            
            <br/> 
            <label className="search_label" for="purc_all">
                 Purchase Allowed :
            </label>
            <select className="search_input" name="purc_all" onChange={e =>setPurc_all(e.target.value)}>
                <option></option>
                <option value={true} className="options">True</option>
                <option value={false} className="options">False</option>
            </select>
            <br/>
            <label className="search_label" for="min_pur_amnt" >
                Minimum Purchase Amount :
            </label>
            <input className="search_input" type="number" name="min_pur_amnt" value={min_pur_amnt} placeholder="Enter Min Amount" onChange={e =>setMin_pur_amnt(e.target.value)}  />
            <br/> 
            <label className="search_label" for="divd_type">
                Dividend Type :
            </label>
            <select className="search_input" name="divd_type" onChange={e =>setDivd_type(e.target.value)}>
                <option></option>
                <option value="idcw-reinvest" className="options">idcw-reinvest</option>
                <option value="growth" className="options">growth</option>
                <option value="idcw-payout" className="options">idcw-payout</option>
            </select>
            <br/> 

            <label className="search_label" for="plan">
                Plan Type :
            </label>
            <select className="search_input" name="plan" onChange={e =>setPlan(e.target.value)}>
                <option></option>
                <option value="regular" className="options">regular</option>
                <option value="direct" className="options">direct</option>
            </select>
            <br/> 

            <label className="search_label" for="setll_ty">
                Settlement Type :
            </label>
            <select className="search_input" name="setll_ty" onChange={e =>setSetll_ty(e.target.value)}>
                <option></option>
                <option value="T1" className="options">T1</option>
                <option value="T2" className="options">T2</option>
                <option value="T3" className="options">T3</option>
                <option value="T4" className="options">T4</option>
                <option value="T5" className="options">T5</option>
                <option value="T6" className="options">T6</option>
                <option value="T7" className="options">T7</option>
            </select>
            
            <br/> <br/>
            <button type="submit" className="search_button">
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

export default Solution;