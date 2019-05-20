import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
  catogery: {type: String, required: true},
  level: {type: String, required: true}
  });

 const PrivacySchema = new Schema({
   label: {type: String, required: true},
   statement: {type: String},
   user: {type: Schema.Types.ObjectId,ref:'User', required: true},
   rules: [RuleSchema],
   created: {
    type: Date,
    default: Date.now,
  }
 });
export default mongoose.model('privacy', PrivacySchema);