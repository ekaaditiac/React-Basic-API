import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';



class App extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    // Component yang setelah di render di dalam halaman
    // var url = "http://omdbapi.com?s=fast+furious&y=&r=json&plot=short";
    var url = "http://codepen.io/jobs.json";
    Request.get(url).then((response) =>{
      this.setState({
        general: response,

      })
    });
    // var url = "http://www.codepen.io/jobs.json";

  }

  componentWillMount(){

  }

  render(){



    return(
      <div>
      <ul>

      </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
