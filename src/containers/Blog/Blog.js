import React, { Component } from 'react';
//import axios from 'axios';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
//import Fullpost from './FullPost/FullPost';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';


const AsyncNewPost = asyncComponent(()=> {
    return import('./NewPost/NewPost'); //special syntax whatever comes beetween only import and execute it.
});

class Blog extends Component {
    state = {
        auth: true,
    }


    render () {
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                exact 
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    textDecoration: 'underline',
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post"  component={ AsyncNewPost } /> : null }
                    <Route path="/posts" component={ Posts } />
                    <Route render={()=> <h1>Not Found</h1>} />
                    {/*<Redirect from="/" to="/posts" />*/}
                    {/* <Route path="/posts" component={ Posts } /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;