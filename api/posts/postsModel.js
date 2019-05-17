import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {type: String, required: true},
  user: {type: Schema.Types.ObjectId,ref:'User', required: true},
  upvotes: {type: Number, default: 0},
  });

 const PostSchema = new Schema({
   title: {type: String, required: true},
   link: {type: String, optional: true},
   user: {type: Schema.Types.ObjectId,ref:'User', required: true},
   comments: [CommentSchema],
   upvotes: {type: Number, min: 0, max: 100, default: 0},
   created: {
    type: Date,
    default: Date.now,
  }
 });
export default mongoose.model('posts', PostSchema);