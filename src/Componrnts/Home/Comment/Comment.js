import React from 'react';
import "./Comment.css"
const Comment = ({ cmt }) => {
    return (
        <div className="mt-2 shadow-lg p-2">
            <div className="d-flex">           
                <p className="comment">{cmt}</p>           
            </div>
        </div>
    );
};

export default Comment;