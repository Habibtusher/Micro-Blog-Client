import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Blog from './Blog';

const ViewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
   
    useEffect(() => {
        fetch('http://localhost:5000/allBlogs')
            .then(res => res.json())
            .then(data => setBlogs(data))

    }, [blogs])
    return (
        <div>
            <h2 className="container text-center mt-4">New Blogs</h2>
            {
                blogs.map(blog => <Blog blog={blog}></Blog>)
            }
        </div>
    );
};

export default ViewBlogs;