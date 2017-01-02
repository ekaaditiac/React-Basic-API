import React from 'react';
import ReactDOM from 'react-dom';

function coinToss () {
  // Randomly return either 'heads' or 'tails'.
  return Math.random() < 0.5 ? 'heads' : 'tails';

}

var pics = {
  maddog: 'https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271754-gregetnya-mad-dog.jpg',
  kolor: 'https://s-media-cache-ak0.pinimg.com/564x/51/b5/b7/51b5b76353f427d49729658eef3a27ed.jpg'

};
function makeDoggy (e){
  if (coinToss() == "heads") {
    e.target.setAttribute('src', 'https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271754-gregetnya-mad-dog.jpg');
    e.target.setAttribute('alt', 'maddog');
  }else{
    e.target.setAttribute('src', 'https://s-media-cache-ak0.pinimg.com/564x/51/b5/b7/51b5b76353f427d49729658eef3a27ed.jpg');
    e.target.setAttribute('alt', 'kolor');
  }


}

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>MadDog Everywhere !</h1>
        <img width="500" src={pics[coinToss() == 'heads' ? 'kolor' : 'maddog']} onClick={makeDoggy}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
