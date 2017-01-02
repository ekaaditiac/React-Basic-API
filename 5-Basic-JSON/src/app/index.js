import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';

const data = [
   {
     author: "MadDog",
     text: "Papah bangga sama kamu nak",
     src:"https://2.bp.blogspot.com/-cD3bhrzhTSg/VKkI3PKXOoI/AAAAAAAAAes/YCsThXgLUXA/s400/gereget%2B(mad%2Bdog).jpg"
   },
   {
     author: "MadDog Part II",
     text: "Maen Volly pakai duren",
     src:"https://cdns.klimg.com/newshub.id/news/2016/05/16/60450/271750-gregetnya-mad-dog.jpg"
   },
   {
     author: "MadDog Part III",
     text: "asap kenalpot",
     src:"https://s-media-cache-ak0.pinimg.com/564x/1d/a7/fb/1da7fb629775ef74bd981ffb0fc734d4.jpg"
   }

]
class App extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.setState({
      datas: data
    });

  }
  render(){
    var datas = _.map(this.state.datas,(data,i)=>{
      return(
        <li key={i}>
          <h5>{data.author}</h5>
          <p>{data.text}</p>
          <img width="350" src={data.src} alt={data.text} />
        </li>
      )
    })
    return(
      <div>
        <ul>
          {datas}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
