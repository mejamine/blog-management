const slugify = require('slugify');
const db = require('../../database/db.config');
const Post = db.posts;

exports.create=(req, res) => {
    const {title,content,author,slug,tags} = req.body;
    if(!title || !content || !author || !slug){
        return res.status(400).send({
            message : 'content can not be empty!'
         })
    }
    const slugy = slugify(slug,'-');
    const newPost = new Post({
        title : title,
        content : content,
        author : author,
        slug : slug,
        tags : tags
    });
    newPost.save(newPost).then((data) =>{
        res.status(200).send({
            message : 'successfully created post!'
        })
    }).catch(err =>{
        console.log(err);
    });
}
exports.findAll = (req, res)=> {
    Post.find({  
    }).then((data)=>{
      res.send(data);
    }).catch((err) =>{
        console.log(err);
    });
}
exports.delete = (req , res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({message:"content is required"});
    }
    Post.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Post not found"});
        }
        res.status(200).send({message:"Post was deleted successfully"});
    });
}
exports.findOne = (req, res) =>{
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required"});
    }
    Post.findById(id).then((data)=> {
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
exports.update =(req, res) =>{
    const id = req.params.id;
    const {title, content,author,slug,tags} = req.body;
    if(!id || !title || !content || !author || !slug || !tags) {
    res.status(400).send({ message: "content is required "});
    }
    Post.findByIdAndUpdate(id,
    {title: title, content: content, author : author, slug : slug, tags : tags},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Post with id=${id}`});
        }
        res.status(200).send({ message: `Post was successfully updated`});
        }).catch((err) =>{
            console.log(err);
        });
}