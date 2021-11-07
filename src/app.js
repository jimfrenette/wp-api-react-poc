import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            heading: "Submit New Post",
            loading: false,
            post_id: null,
            post_title: null,
            post_content: null,
            posts: []
        };
    }

    delPost(post) {
        fetch(`${wp_api_react_poc.rest_url}wp/v2/posts/${post.id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wp_api_react_poc.nonce
            }
        })
        .then(() => {
           //
        })
        .catch((error) => {
            console.error(error);
        });
    }

    newPost(post) {
    }

    putPost(post) {
        fetch(`${wp_api_react_poc.rest_url}wp/v2/posts/${post.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wp_api_react_poc.nonce
            },
            body: JSON.stringify(post)
        })
        .then(() => {
            // this.getPosts();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            let params = `?author=${wp_api_react_poc.current_user_id}&status=any`
            return fetch(`${wp_api_react_poc.rest_url}wp/v2/posts/${params}`,{
                method: 'GET',
                headers: {
                    'X-WP-Nonce': wp_api_react_poc.nonce
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    posts: responseJson,
                    loading: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (this.state.post_id) {
            this.putPost({
                id: this.state.post_id,
                title: this.state.post_title,
                content: this.state.post_content
            });
        } else {
            this.newPost({
                title: this.state.post_title,
                content: this.state.post_content
            });
        }
    }

    handleDeleteClick(evt, item) {
        this.delPost({id: item.id});
    }

    handleContentChange(evt) {
        this.setState({ post_content: evt.target.value });
    }

    handleTitleChange(evt) {
        this.setState({ post_title: evt.target.value });
    }

    handleTitleClick(evt, item) {
        this.setState({ post_id: item.id });
        this.setState({ post_title: item.title.rendered });
        this.setState({ post_content: item.content.rendered });
    }

    render() {
        let content;

        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else {
            content = this.state.posts.map((item, index) => {
                return (
                    <div>
                        <a html="#" onClick={(evt) => this.handleTitleClick(evt, item)}>{item.title.rendered}</a>
                        <a href="#" title="DELETE" onClick={(evt) => this.handleDeleteClick(evt, item)}>[–]</a>
                    </div>
                )
            });
        }

        return (
            <div>
            <form onSubmit={(evt) => this.handleSubmit(evt)}>
                <div>
                    <label>Title</label>
                    <input type="text" required="" aria-required="true" defaultValue={this.state.post_title} onChange={(evt) => this.handleTitleChange(evt)}/>
                </div>
                <div>
                    <label>Content</label>
                    <textarea rows="8" cols="20" defaultValue={this.state.post_content} onChange={(evt) => this.handleContentChange(evt)}></textarea>
                </div>
                <input type="submit" value="Submit" />
            </form>
            <div>{content}</div>
            </div>
        );
    }
}

export default App;