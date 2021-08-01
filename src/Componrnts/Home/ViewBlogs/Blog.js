import React from 'react';
import "./Blog.css"
import { useForm } from 'react-hook-form';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai"
import { useContext, useEffect } from 'react';
import { UserContext } from './../../../App';
import { useState } from 'react';
import Comment from '../Comment/Comment';
const Blog = ({ blog }) => {

    const { register, handleSubmit } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const downVotePost = id => {

        // if (blog.downVote.find(ele => ele === loggedInUser.email)) {
        //     alert("already voted");
        // }

        // else {
        // }
            const newData = {
                data: loggedInUser.email
            }
            fetch(`http://localhost:5000/addDownVote/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            }).then(res => {
                console.log("server");
            })
                .catch(err => {
                    console.log(err);
                })
        
    }

    const upVotePost = (id) => {
       
        console.log(loggedInUser.email);
        console.log(id);
        // if (blog.upVote.find(ele => ele === loggedInUser.email)) {
        //     alert("already voted");
        // }

        // else {
        // }
            const newData = {
                data: loggedInUser.email
            }
            fetch(`http://localhost:5000/addLikes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            }).then(res => {
                console.log("server");

            })
                .catch(err => {
                    console.log(err);
                })
       
    }

    const onSubmit = (data) => {
        const id = data.id;
        const newComment = {
            comment: data.comment,
            profilePic: loggedInUser.photoURL,
            name: loggedInUser.name,
        }
        fetch(`http://localhost:5000/addComments/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)

        }).then(res => {
            clear();

        })
            .catch(err => {

            })
    }
    const clear = () => {
        document.getElementById("comments").value = "";

    }
    return (
        <div className="mx-auto mt-5 blogs shadow-lg p-2">
            <div className="d-flex">
                <div >
                    <img style={{ borderRadius: "50%", width: "50px" }} src={blog.profilePic} alt="" />
                </div>
                <div className="nameDate">
                    <h5>{blog.name}</h5>
                    <span>{blog.date}</span>
                </div>

            </div>
            <div className="blogDetail">
                <h6 className="mt-3 p-2">{blog.title}</h6>
                <img style={{ height: "150px", width: "200px" }} src={blog.imageURL} alt="" />
                <p style={{ textAlign: "justify" }} className="mt-3 p-2">{blog.content}</p>
            </div>
            <div className="likeContainer d-flex p-2">
                <p className="up-vote" onClick={() => upVotePost(blog._id)}> {blog?.upVote ? blog.upVote.length : 0}<FaThumbsUp /> </p>

                <p className="down-vote" onClick={() => downVotePost(blog._id)}>{blog?.downVote ? blog.downVote.length : 0}<FaThumbsDown /> </p>
                <button className="btn btn-sm btn-outline-info" > {blog?.comments ? blog?.comments?.length : 0} <AiFillMessage />
                    Comments
                </button>

            </div>
            <div className="comments mt-3 mb-3">
                <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
                    <textarea id="comments" name="comment" className="form-control" required {...register("comment")} />
                    <input style={{ display: "none" }} className="form-control" name='id' value={blog._id} {...register("id")} />
                    <br />
                    <input className='btn btn-outline-info' type="submit" value="Comment" />
                </form>
            </div>
            {
                blog?.comments?.map(cmt => <Comment cmt={cmt}></Comment>)
            }
        </div>
    );
};

export default Blog;