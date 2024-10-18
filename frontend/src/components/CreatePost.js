import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './createPost.css';
const CreatePost =()=>{
    const navigate = useNavigate();
    const [newBlog, setNewBlog] = useState({});
    const handleChange = (e)=>{
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:3000/api/posts', newBlog);
            navigate('/');
        }catch(error){
            console.error("Error creating blog:",error);
        }
    };
    return(
        <div className="container mt-5">
            <h1 className="mb-4">Create Blog</h1>
            <div className="form-group">
                <div className="form-control">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        requiredplaceholder="enter title"
                    />
                </div>
                <div className="form-control">
                    <label>Content</label>
                    <textarea
                        rows={3}
                        name="content"
                        onChange={handleChange}
                        requiredplaceholder="enter content"
                    />
                </div>
                <div className="form-control">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        onChange={handleChange}
                        requiredplaceholder="enter author"
                    />
                </div>
                <div className="form-control">
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        onChange={handleChange}
                        requiredplaceholder="enter slug"
                    />
                </div>
                <div className="form-control">
                    <label>Tags</label>
                    <input
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        requiredplaceholder="enter tags"
                    />
                </div>
                <button className="custom-button" type="submit" onClick={handleSubmit}>
                    Create Blog
                </button>
            </div>
        </div>    
    );
};
export default CreatePost;