import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './../../App';


const AddBlog = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit } = useForm();
    const [imageUrl, setImageUrl] = useState(null);

    const onSubmit = data => {
       
        const blog = {
            
            title: data.title,
            content: data.content,
            imageURL: imageUrl,
            date:Date(),
            name: loggedInUser.name,
            email: loggedInUser.email,
            profilePic:loggedInUser.photoURL,
        };
        const url = "https://intense-bastion-95453.herokuapp.com/addBlog"

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => {
                clear();
                console.log('server side');
               

            })
    }
    const handleImageUpload = (event) => {

        // console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '3ea6925d54a056d4dcb7a26c6292821b');
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const clear =()=>{
        document.getElementById("title").value="";
        document.getElementById("content").value="";
        document.getElementById("img").value="";
    }
    return (

        <div className="container mt-3 shadow-lg p-2">
            <h3 className="p-2 mb-3">Create a new post</h3>

            <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title</label>
                <br />
                <input id="title" className="form-control" name='title' {...register("title")} />
                <br />
                <label htmlFor="content">Content</label>
                <br />
                <textarea id="content" name="content" className="form-control" required {...register("content")} />
                <br />
                <label htmlFor="">Upload Image</label>
                <br />
                <input id="img" className="form-control" name="exampleRequired" type="file" required onChange={handleImageUpload} />
                <br />
                <br />
                <input className='btn btn-outline-info' type="submit" value="Create Post" />
            </form>
           
        </div>
    );
};

export default AddBlog;