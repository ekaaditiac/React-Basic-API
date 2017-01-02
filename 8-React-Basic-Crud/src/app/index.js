"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';







class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      query: "Trek",
      currentMovie: "tt0232500",
      condition: false,
      className: ""
    };
  }

  MyClick(filter){
       this.setState({ condition : !this.state.condition });
  }



  componentWillMount(){
   // Called the first time the component is loaded right before the component is added to the page
   this.search();
 }

 componentDidMount(){
   // Called after the component has been rendered into the page
 }


  updateSearch(){
    this.setState({
      query: this.refs.query.value
    })
     this.search(this.refs.query.value);
  }

  selectMovie(){
    this.setState({
        currentMovie:this.refs.movieSelector.value
    });

  }

  render(){
    var movies = _.map(this.state.movies,(movie,i)=>{
      return(
        <li key={movie.imdbID} style={{"display":"inline-block" }}>
          <div style={{"display":"inline-block","border-radius":"50%","width":"50px","height":"50px","overflow":"hidden"}}>
            <img width="50" src={movie.Poster}/>
          </div>
          {movie.Title}
        </li>
      );
    });
    var options = _.map(this.state.movies,(movie,i)=>{
      return(
        <option key={`option_${movie.imdbID}`} value={movie.imdbID}>
          {movie.Title}
        </option>
      );
    });
    var selectedMovie = _.find(this.state.movies,(movie)=>{
      return movie.imdbID == this.state.currentMovie;
    });
    var img;
    if(selectedMovie){
      img = <img src={selectedMovie.Poster} />
    }
    return(
      <div>
      <button className={this.state.condition ? "active" :"inActive"} onClick={this.MyClick.bind(this)}>Click ME !</button>
       <input ref="query" onChange={ (e) => { this.updateSearch(); } } type="text" value={this.state.query}/>
       <select ref="movieSelector" onChange={(e) => {this.selectMovie();}} value={this.state.currentMovie}>
         {options}
       </select>
        <ul>
          {movies}
        </ul>
        {img}
      </div>
    );
  }

   search(query = "The fast"){
    var url = `http://www.omdbapi.com?s=${query}&y=&r=json&plot=short`;
    Request.get(url).then((response) =>{
      this.setState({
        general: response,
        movies: response.body.Search,
        total: response.body.totalResults
      });
    });
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
