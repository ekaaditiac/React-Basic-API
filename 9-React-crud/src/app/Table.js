import React from 'react';
import _ from 'lodash';

import Button from './Button';



class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentWillReceiveProps(){

    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    handleUpdate(){
        alert('button Clicked');
    }




    render(){

      var TableRow = _.map(this.props.datas, (data,i)=>{
          return (
            <tr key={i}>
                <td> {data.id} </td>
                <td> {data.username} </td>
                <td> {data.email} </td>
                <td>
                    <Button color="btn-success" text="Hapus" onClick={() => this.props.deleteUser(data)} />
                    &nbsp;
                    <Button color="btn-warning" text="Edit" onClick={() => this.props.editUser(data)} />
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
