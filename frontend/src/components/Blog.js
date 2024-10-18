import React ,{useState, useEffect,inputRef,useRef} from 'react'
import axios from 'axios'
import './Blog.css'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
const Blog =()=>{
    const navigate = useNavigate();
    const [blogs , setBlogs]=useState([])
    const [deleteMsg, setDeleteMsg]=useState(false)
    useEffect(()=>{
        const fetchData = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/api/posts')
            if(response){
                setBlogs(response.data)
            }
        }catch(error){
            console.error('something went wrong',error);
        }
    };
    
    fetchData();
},[])
const DeletePost = async (id)=>{

    try{
    await axios.delete(`http://localhost:3000/api/posts/${id}`)
    const response = await axios.get('http://localhost:3000/api/posts');
    setDeleteMsg(true)
    inputRef.current.scrollIntoView({ behavior:'smooth'});
    setBlogs(response.data);
    }catch(error){
        console.error('Somthing went wrong !' , error);
    }
};
const UpdatePost = (id)=>{
    navigate(`/update/${id}`);
}

    return (
        <div className="container" ref={inputRef}>
            <div className="flex">
                <h1>Blog List</h1>
                <Link className="btn-primary" to="/create">Create Post</Link>
            </div>
            {deleteMsg &&
                <div style={{ backgroundColor :"#34cd60", color:"#fff",padding:"10px",borderRadius:"5px"}}>
                    la post est bien supprimée
                </div>
            }
            <div>
                {blogs.map((blog)=>(
                        <div key={blog._id} className='list-group-item'>
                            <div>
                                <h3>Title : {blog.title}</h3>
                                <p>Content : {blog.content}</p>
                                <p>Author : {blog.author}</p>
                                <p>Slug : {blog.slug}</p>
                                <p>Tags : {blog.tags}</p>
                                <button 
                                    onClick={()=> DeletePost(blog.id)}
                                    className="btn-danger"
                                >
                                    delete
                                </button>
                                <button
                                    onClick={()=> UpdatePost(blog.id)}
                                    className="btn-blue"
                                >
                                    update
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>    
    )
}
export default Blog