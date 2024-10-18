module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let PostSchema = new Schema({
        title: { type: String, require: true},
        content: { type: String, require: true},
        slug: { type: String, require: true},
        tags: { type: Array},
        author: { type: String, require: true},
        published: { type: Boolean,enum: [true,false],default:true},
    },
    {
        timestamps: true
    });
    PostSchema.method('toJSON', function(){
        const{__v, _id, ...object}=this.toObject();
        object.id = _id;
        return object;
    })
    const Post = mongoose.model('Post', PostSchema);
    return Post;
}