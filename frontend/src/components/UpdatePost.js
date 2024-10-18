import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import './updatePost.css';
const UpdatePost =()=>{
    const {id} = useParams('id');
    const [newBlog, setNewBlog] = useState({});
    useEffect(() => {
        getPost();
      }, []);
    
      const getPost = async() => {
        await axios.get(`http://localhost:3000/api/posts/${id}`)
          .then((item) => {
            setNewBlog(item.data);
            console.log(newBlog);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:3000/api/posts/${id}`, newBlog);
            navigate('/');
        }catch(error){
            console.error("Error Updating blog:",error);
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
                        value={newBlog.title}
                    />
                </div>
                <div className="form-control">
                    <label>Content</label>
                    <textarea
                        rows={3}
                        name="content"
                        onChange={handleChange}
                        requiredplaceholder="enter content"
                        value={newBlog.content}
                    />
                </div>
                <div className="form-control">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        onChange={handleChange}
                        requiredplaceholder="enter author"
                        value={newBlog.author}
                    />
                </div>
                <div className="form-control">
                    <label>Slug</label>
                    <input
                        type="text"
                        name="slug"
                        onChange={handleChange}
                        requiredplaceholder="enter slug"
                        value={newBlog.slug}
                    />
                </div>
                <div className="form-control">
                    <label>Tags</label>
                    <input
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        requiredplaceholder="enter tags"
                        value={newBlog.tags}
                    />
                </div>
                <button className="custom-button" type="submit" onClick={handleSubmit}>
                    Update Blog
                </button>
            </div>
        </div>    
    );
};
export default UpdatePost;