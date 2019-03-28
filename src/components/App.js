import React, { Component } from 'react';

import './App.css';
import axios from "axios";
import Post from "./Post/Post"
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind( this );
  }
  
  componentDidMount() {
    let posts = axios.get("https://practiceapi.devmountain.com/api/posts")
    posts.then((response) => {
      this.setState({posts: response.data})
    })
  }

  updatePost(id, text) {
    console.log(id)
   axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
  .then((response) => {
      this.setState({posts: response.data})
    })
    .catch(error =>
      console.log(error))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response => {
      this.setState({posts: response.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(response =>
      this.setState({posts: response.data}))
  }

  searchPost(text) {
    if (text === ""){return}
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`).then (response => {
      this.setState({posts: response.data})
    }
    )
  }

  render() {

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {this.state.posts.map((post) => {
            return(
            <Post key={post.id} 
            text={post.text} 
            date={post.date} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
            id={post.id}/>
          )})}
          
        </section>
      </div>
    );
  }
}

export default App;
