import React from 'react';
import ReactDOM from 'react-dom';

function myFunction (e) {
  console.log("MadDog Everywhere !");
  e.target.setAttribute('src', 'https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271754-gregetnya-mad-dog.jpg');
  e.target.setAttribute('alt', 'maddog');
  e.target.setAttribute('width', '450');
}



class App extends React.Component{
  render(){
    return(
      <div>
        <h1>MadDog Everywhere !</h1>
        <img width="450" src='https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271749-gregetnya-mad-dog.jpg' onClick={myFunction}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
