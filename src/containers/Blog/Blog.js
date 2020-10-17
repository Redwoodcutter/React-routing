import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    //Getting Json File
    componentDidMount(){
     axios.get('/posts')
        .then(response =>{
            const posts = response.data.slice(0,4);
            const updatedPost = posts.map(post=>{
                return{
                    ...post,
                    author: 'Cezmi'
                }
            })
            this.setState({posts: updatedPost});
            // console.log(response);
        });
    }
    //Selected id function
    postSelectedHandler = (id) =>{
        this.setState({selectedPostId: id});
    }

    render () {
        const posts = this.state.posts.map(
            post=>{
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={()=>this.postSelectedHandler(post.id)}/>
            }
        );
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">New Post</a></li>
                            <li><a href="">Home</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} /> 
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;