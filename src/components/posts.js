const { useState, useEffect } = wp.element;

function Posts() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);

    let content, list;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (method = 'GET', post = null) => {
        let body, params;

        if (post) {
            params = `${post.id}/?author=${wp_api_react_poc.current_user_id}&status=any`;
            body = JSON.stringify(post);
        } else {
            params = `?author=${wp_api_react_poc.current_user_id}&status=any`;
        }

        setLoading(true);

        const url = `${wp_api_react_poc.rest_url}wp/v2/posts/${params}`;

        try {
            const response = await fetch(url,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wp_api_react_poc.nonce
                },
                body: body
            });
            const json = await response.json();
            if (method == 'GET') {
                setPosts(json);
            } else {
                handleSubmitResponse();
            }
            setLoading(false);
        } catch (error) {
            console.log("error", error);
        }
    }

    function handleContentChange(evt) {
        setPostContent(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (postId) {
            fetchData('PUT', {
                id: postId,
                title: postTitle,
                content: postContent,
                status: 'publish'
            });
        } else {
            fetchData('PUT', {
                title: postTitle,
                content: postContent,
                status: 'publish'
            });
        }
    }

    function handleSubmitResponse(evt) {
        fetchData();
    }

    function handleTitleChange(evt) {
        setPostTitle(evt.target.value);
    }

    function handleDeleteClick(evt) {
        fetchData('DELETE', {id: postId});
    }

    function handleNewPostClick(evt) {
        setPostId(null);
        setPostTitle(null);
        setPostContent(null);
    }

    function handleTitleClick(evt, item) {
        setPostId(item.id);
        setPostTitle(item.title.rendered);
        setPostContent(item.content.rendered);
    }

    if (loading) {
        content = <div>Loading...</div>;
    } else {
        list = posts.map((item, index) => {
            return (
                <li>
                    <a html="#" onClick={(evt) => handleTitleClick(evt, item)}>{item.title.rendered}</a>
                    <a href="#" title="DELETE" onClick={(evt) => handleDeleteClick(evt, item)}>[&ndash;]</a>
                </li>
            )
        });
        content = <ul>{list}</ul>;
    }

    return (
        <div>
        <form onSubmit={(evt) => handleSubmit(evt)}>
            <div>
                <label>Title</label>
                <input type="text" required="" aria-required="true" defaultValue={postTitle || ''} onChange={(evt) => handleTitleChange(evt)}/>
            </div>
            <div>
                <label>Content</label>
                <textarea rows="8" cols="20" defaultValue={postContent || ''} onChange={(evt) => handleContentChange(evt)}></textarea>
            </div>
            <input type="submit" value="Submit" />
            <span>
                <a href="#" onClick={(evt) => handleNewPostClick(evt)}>New Post</a>
            </span>
        </form>
        {content}
        </div>
    );
}

export default Posts;