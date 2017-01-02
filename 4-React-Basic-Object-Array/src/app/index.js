import React from 'react';
import ReactDOM from 'react-dom';


var people = [
              'Dono', 'Didi', 'Dian',
              'Eka', 'Tevi', 'Dio', 'Dimas',
              'Cintiya','Diana'
             ];


class App extends React.Component{

  render(){

    var peopleLIs = people.map(function(person,i){
      // return statement goes here:
      return <li key={'person_' + i}>{person}</li>;
    });
    return(
      <div>
        <ul>
          {peopleLIs}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
