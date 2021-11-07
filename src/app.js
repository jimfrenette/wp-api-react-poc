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

    // delPost(post) {
    //     fetch(`${wp_api_react_poc.rest_url}wp/v2/posts/${post.id}`,{
    //         method: 'DELETE',
    //         headers: {
    //             'X-WP-Nonce': wp_api_react_poc.nonce
    //         }
    //     })
    //     .then(() => {
    //         // this.getPosts();
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }

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

    render() {
        let content;

        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else {
            content = this.state.posts.map((item, index) => {
                return (
                    <div>
                        <a html="#">{item.title.rendered}</a>
                    </div>
                )
            });
        }

        return (
            <div>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" required="" aria-required="true" />
                </div>
                <div>
                    <label>Content</label>
                    <textarea rows="8" cols="20"></textarea>
                </div>
                <input type="submit" value="Submit" />
            </form>
            <div>{content}</div>
            </div>
        );
    }
}

export default App;