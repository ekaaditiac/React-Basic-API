import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';

class App extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  componentWillMount(){
    // Component yang pertama kali telah loaded/terisi tepat sebelum component itu di tambahkan di halaman

  }

  componentDidMount(){
    // Component yang setelah di render di dalam halaman
    // var url = "http://omdbapi.com?s=star&y=&r=json&plot=short";
    var url = "http://codepen.io/jobs.json";
    Request.get(url).then((response) =>{
      this.setState({
        jobs: response.body.jobs,

      })
    });
    // var url = "http://www.codepen.io/jobs.json";

  }

  render(){
    var jobs = _.map(this.state.jobs,(job,key) =>{
      return(
        <li key={key}>
          <h5>{job.company_name}</h5>
          <p><span>Address: </span>{job.address && job.address.address1}</p>
          <p><span>City: </span>{job.address && job.address.city}</p>
        </li>
      );
    });
    return(
      <div>
        <ul>
          {jobs}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
