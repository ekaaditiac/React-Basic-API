import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';
import axios from 'axios';

import Table from './Table';
import Form from './Form';
import Modal from './Modal';


class App extends React.Component{

  constructor(){
      super();
      this.state = {
          datas: 'sasdasd',
          openModal: false
      };
  }

  componentWillMount(){
  }

  componentDidMount(){
      var url = "http://localhost:8888/service/users.php";
      axios.get(url).then((response) => {
         this.setState({
            general: response,
            datas: response.data
         });
      });
  }

  updateUser(dataEdit, email, username){

    if(email === ''){
        return alert('Email gk boleh kosong');
    }

    if(username === ''){
        return alert('Username gk boleh kosong');
    }

    var data = new FormData();
    data.append('update', dataEdit.id);
    data.append('username', username);
    data.append('email', email);

    axios({
          method: 'post',
          url: 'http://localhost:8888/service/users.php',
          data: data,
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
    })
    .then(response => {
          if(response.data.status === 'success'){
              axios.get('http://localhost:8888/service/users.php')
                 .then(response => {
                    this.setState({
                        datas : response.data,
                        openModal: false
                    });
              });
          }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  createUser(email, username){

    if(email === ''){
        return alert('Email gk boleh kosong');
    }

    if(username === ''){
        return alert('Username gk boleh kosong');
    }

    var data = new FormData();
    data.append('create', true);
    data.append('username', username);
    data.append('email', email);

    axios({
          method: 'post',
          url: 'http://localhost:8888/service/users.php',
          data: data,
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
    })
    .then(response => {
          if(response.data.status === 'success'){
              axios.get('http://localhost:8888/service/users.php')
                 .then(response => {
                    this.setState({
                        datas : response.data,
                        inputEmail : '',
                        inputUsername : ''
                    });
              });
          }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  editUser(props){
      this.setState({
         openModal : true,
         dataEdit: props
      });
  }

  closeModal(){
      this.setState({
         openModal : false
      });
  }

  deleteUser(props){

      var data = new FormData();
      data.append('delete', true);
      data.append('id', props.id);

      if(confirm('Yakin ingin hapus ? ' + props.username)){

          axios({
              method: 'post',
              url: 'http://localhost:8888/service/users.php',
              data: data,
              headers: {
                  'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
              }

        })
        .then(response => {
              if(response.data.status === 'success'){
                  axios.get('http://localhost:8888/service/users.php')
                     .then(response => {
                        this.setState({
                            datas : response.data,
                        });
                  });
              }
        })
        .catch(function (error) {
          console.log(error);
        });

      }

  }

  render(){

    return(
     <div className="container">

         <div className="row">
             <div className="col-md-12">
                 <h2>React CRUD</h2>
             </div>
         </div>

         <div className="row">
             <div className="col-md-12">
                 < Form createUser={this.createUser.bind(this)} />
             </div>
         </div>

         <div className="row">
             <div className="col-md-12">
                < Table datas={this.state.datas} deleteUser={this.deleteUser.bind(this)} editUser={this.editUser.bind(this)}/>
             </div>
         </div>

         <Modal isOpen={this.state.openModal}
                dataEdit={this.state.dataEdit}
                closeModal={this.closeModal.bind(this)}
                updateUser={this.updateUser.bind(this)} />

     </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
