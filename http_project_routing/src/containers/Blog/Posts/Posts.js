import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import "./Posts.css";
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostID: id});
  }

  componentDidMount(){
    axios.get('/posts')
    .then(response => {
      const posts = response.data.slice(0,4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Aditi'
        }
      })
      this.setState({posts: updatedPosts});
      console.log(response);
    })
    .catch(error => {
      this.setState({error: true});
      console.log(error);
    });
  }


  render(){
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
    if(!this.state.error){
       posts = this.state.posts.map(
        post => {
          return (
            <Link to={'/posts/' + post.id} key={post.id}>
              <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)} />
            </Link>
          );
        }
      );
    }

    return(
      <div>
        <section className="Posts">
            {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
