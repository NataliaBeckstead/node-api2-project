import React from 'react';
import './App.css';
import axios from "axios";
import Posts from "./components/Post";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/posts')
    .then(res => {
      console.log(res);
      this.setState({
        posts: res.data
      })
      return res.data
    })
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts} />
      </div>
    );
  }

  
}


export default App;
