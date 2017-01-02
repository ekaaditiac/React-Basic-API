import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import Button from './Button';

class Table extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            datas : this.props.datas,
            inputEdit : ''
        };
    }
    
    componentWillReceiveProps(){
        this.setState({
          datas: this.props.datas
       });
    }
  
    componentWillMount(){
         
    }
    
    componentDidMount(){

    }
    
    handleUpdate(){
        alert('button Clicked');
    }
    
    handleFormEdit(e){
        this.setState({
            inputEdit : e.target.value
        });
    }
    
    formEdit(prop){
        return <input className="form-control" value={prop.text} />
    }
    
    render(){  
      var TableRow = _.map(this.props.datas, (data, i) => {
          return(
          <tr key={i}>
              <td> {data.id} </td>
              <td> {data.username} </td>
              <td> {data.email} </td>
              <td> 
                  <Button text="Hapus" onClick={() => this.props.deleteUser(data)} />
                  &nbsp;
                  <Button text="Edit" onClick={() => this.props.editUser(data)} />
              </td>
          </tr>
          )
      });
      
      return(
       <div className="panel panel-default">
            <div className="panel-body">
               <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> No </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> # </th>
                        </tr>
                        
                        { TableRow }
                        
                    </thead>
               </table>
            </div>
        </div>
      )
    }
    
}

export default Table;
