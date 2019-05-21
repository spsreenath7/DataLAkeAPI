import express from 'express';
import Activity from './actsModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();// eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  const acts = await Activity.find({user : req.user._id}, function (err, docs) {return res.send(docs);});
  
}));

// Add a post
router.post('/', asyncHandler(async (req, res) => {
  const newAct = req.body;
  newAct.user = req.user._id;
  if (newAct) {
        const activity = await Activity.create(newAct);
        return res.status(201).send({activity});
    } else {
       return handleError(res, err);
    }
}));

// upvote a post
// router.post('/:id/upvotes', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const post = await Post.findById(id);
//   post.upvotes++;
//   await post.save();
//   return res.status(201).send({post});
// }));
// 
// get post
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const activity = await Activity.findById(id);
    return res.status(201).send({activity});
}));

router.post('/:id', asyncHandler(async (req, res) => {
  
  const updatedAct = req.body;
  const id = req.params.id;
  const activity = await Activity.findById(id);
  activity.title= updatedAct.title;
  activity.url= updatedAct.url;
  activity.catogery=updatedAct.catogery;
  activity.privacy=updatedAct.privacy;
  activity.user= req.user._id;
  await activity.save();
  return res.status(201).send({activity});
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const activity = await Activity.findById(id);
  if (!activity) return res.send(404);
  await activity.remove();
  return res.status(204).send(activity);
}));



/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;