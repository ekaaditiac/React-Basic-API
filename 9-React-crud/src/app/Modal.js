import React from 'react';

import Button from './Button';

class Modal extends React.Component {

  constructor(props){
      super(props);
      this.state = {}
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.isOpen === true){
          this.setState({
               inputUsername : nextProps.dataEdit.username,
               inputEmail : nextProps.dataEdit.email
          });
      }
  }

  handleInputUsername(e){
      this.setState({
          inputUsername : e.target.value
      })
  }

  handleInputEmail(e){
      this.setState({
          inputEmail : e.target.value
      })
  }
  

  render(){
    if(this.props.isOpen === false)
        return null;

    let modalStyle = {
     position: 'fixed',
     top: '40%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     zIndex: '9999'
   }

   let backdropStyle = {
     position: 'fixed',
     width: '100%',
     height: '100%',
     top: '0px',
     left: '0px',
     zIndex: '9998',
     background: 'rgba(0, 0, 0, 0.3)'
   }
    return(
      <div>
          <div className="col-md-4" style={modalStyle}>
              <div className="panel panel-default">
                  <div className="panel-body">

                      <div className="form-group">
                          <label> Username </label>
                          <input type="text" value={this.state.inputUsername} onChange={this.handleInputUsername.bind(this)} className="form-control" />
                      </div>

                      <div className="form-group">
                          <label> Email </label>
                          <input type="text" value={this.state.inputEmail} onChange={this.handleInputEmail.bind(this)} className="form-control" />
                      </div>

                      <div className="form-group">
                          < Button text="Update" onClick={() => this.props.updateUser(this.props.dataEdit, this.state.inputEmail, this.state.inputUsername)} />
                          &nbsp;
                          < Button text="Close" onClick={() => this.props.closeModal()} />
                      </div>

                  </div>
              </div>
          </div>
          <div style={backdropStyle} onClick={() => this.props.closeModal()}/>
      </div>
    )
  }

}


export default Modal;
