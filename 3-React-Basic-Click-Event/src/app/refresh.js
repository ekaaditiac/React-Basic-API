import React from 'react';
import ReactDOM from 'react-dom';

function randomPics () {
  // This function will randomly return either 'heads' or 'tails'.
  return Math.random() < 0.5 ? 'heads' : 'tails';
}

var pics = {
  maddog: 'https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271754-gregetnya-mad-dog.jpg',
  kolor: 'https://s-media-cache-ak0.pinimg.com/564x/51/b5/b7/51b5b76353f427d49729658eef3a27ed.jpg'

};

// if/else statement begins here:
if (randomPics () == "heads") {
  var img = <img width="500" src={pics.maddog} />;
}else{
  var img = <img width="500" src={pics.kolor} />
}

class App extends React.Component{
  render(){
    return(
      <div>
        {img}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
