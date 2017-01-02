import React from 'react';


class Button extends React.Component{

    render(){
        return(
            <button className="btn btn-primary" onClick={this.props.onClick}> {this.props.text} </button>
        )
    }

}

export default Button;
