import React from 'react';
import ReactDOM from 'react-dom';

function makeDoggy (e){
  e.target.setAttribute('src', 'https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-puppy.jpeg');
  e.target.setAttribute('alt', 'doggy');
}
class App extends React.Component{
  render(){
    return(
      <div>
        <img width="500" src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-kitty.jpg" alt="Title Alt" onClick={makeDoggy} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
