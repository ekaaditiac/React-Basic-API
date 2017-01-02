import React from 'react';
import Button from './Button';
import axios from 'axios';

class Form extends React.Component{

    constructor(){
        super();
        this.state = {
            inputUsername : '',
            inputEmail : ''
        };
    }

    handleInputUsername(e){
        this.setState({
            inputUsername: e.target.value
        });
    }

    handleInputEmail(e){
        this.setState({
            inputEmail: e.target.value
        });
    }

    // handleCreate(){
    //     this.props.createUser(this.state.inputEmail, this.state.inputUsername);
    // }

    render(){
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="form-group">
                        <label> Username </label>
                        <input type="text" value={this.state.inputUsername} onChange={this.handleInputUsername.bind(this)} placeholder="Username" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Email </label>
                        <input type="text" value={this.state.inputEmail} onChange={this.handleInputEmail.bind(this)} placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group">
                        < Button text="Tambah" onClick={() => this.props.createUser(this.state.inputEmail, this.state.inputUsername)} />

                    </div>
                </div>
            </div>
        )
    }

}

export default Form;
