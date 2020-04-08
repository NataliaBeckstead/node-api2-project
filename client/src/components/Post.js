import React, {Component} from 'react';

class Posts extends Component {

    render(){
        return(
            this.props.posts.map(post => {
                return (
                    <div className='card'>
                        <h2>{post.title}</h2>
                        <h3>{post.contents}</h3>
                        <p>Created at: {post.created_at}</p>
                        <p>Updated at: {post.updated_at}</p>
                    </div>
                )
            })

        )
    }
}

export default Posts;