import React from 'react';


class Button extends React.Component{

    render(){
        return(
            <button className={`btn btn-primary ${this.props.color}`} onClick={this.props.onClick}> {this.props.text} </button>
        )
    }

}

export default Button;
