import mongoose from 'mongoose';
const Schema = mongoose.Schema;


 const ActsSchema = new Schema({
   title: {type: String, required: true},
   url: {type: String, required: true},
   user: {type: Schema.Types.ObjectId,ref:'User', required: true},
   catogery: {type: String, required: false},
    privacy: {type: String, required: false},
   created: {
    type: Date,
    default: Date.now,
  }
 });
export default mongoose.model('acts', ActsSchema);