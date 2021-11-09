const { useState, useEffect } = wp.element;

import Posts from './components/posts';

function App() {
    return (
        <div>
            <Posts />
        </div>
    );
}

export default App;