import React,{Component} from 'react';
import ReactTable from "react-table";  



class Group extends Component {  
  render() {  
     const data = [{  
        group_name: 'sss',  
        genre: 'stock'
        },{  
         name: 'wqwwq',  
         genre:'gold'  
         }]  
     const columns = [{  
       Header: 'Name',  
       accessor: 'name'  
       },{  
       Header: 'Genre',  
       accessor: 'genre'  
       }]  
    return (  
          <div>  
              <ReactTable  
                  data={data}  
                  columns={columns}  
                   
              />  
          </div>        
    )  
  }  
}  
export default Group;  
