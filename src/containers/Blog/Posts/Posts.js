import React, { Component } from 'react';
import axios from '../../../axios';
import { Link,Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import Fullpost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

     //Getting Json File
     componentDidMount(){
         console.log(this.props)
        axios.get('/posts')
           .then(response =>{
               const posts = response.data.slice(0,4);
               const updatedPost = posts.map(post=>{
                   return{
                       ...post,
                       author: 'Cezmi'
                   } 
                });
                // console.log(response);
                this.setState({posts: updatedPost});
               })
            .catch(error =>{
                console.log(error);
               });
           
          
       }
   

//Selected id function
postSelectedHandler = (id) =>{
   this.props.history.push('/posts/' + id)
}

render(){
    let posts = <p style ={{textAlign: 'center'}}>Someting went wrong</p>
    if(!this.state.error){
        posts = this.state.posts.map(post => {
            return <Link 
                    to={'/posts/' + post.id}  
                    key={post.id} >
                        <Post 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
        });
    }
    return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={this.props.match.url + '/:postId'} exact component={ Fullpost } />
        </div>
    )
    }
}

export default Posts;