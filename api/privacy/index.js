import express from 'express';
import Privacy from './privacyModel';
import asyncHandler from 'express-async-handler';
import { request } from 'http';

const router = express.Router();// eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
  const privacy = await Privacy.find({user : req.user._id}, function (err, docs) {return res.send(docs);});
}));

// Add a post
router.post('/', asyncHandler(async (req, res) => {
  const newPrivacy = req.body;
  newPrivacy.user = req.user._id;
  if (newPrivacy) {
        const privacy = await Privacy.create(newPrivacy);
        privacy.rules.push({catogery: "any", level: "high"});
        await privacy.save();
        return res.status(201).send({privacy});
    }
}));

router.post('/:id/rules', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newRule = req.body;
  const privacy = await Privacy.findById(id);
  privacy.rules.push(newRule);
  await privacy.save();
  return res.status(201).send({privacy});
}));

// get post
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const privacy = await Privacy.findById(id);
    return res.send({privacy});
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const privacy = await Privacy.findById(id);
  if (!privacy) return res.send(404);
  await privacy.remove();
  return res.status(204).send(privacy);
}));
// router.delete('/:id', asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   const activity = await Activity.findById(id);
//   if (!activity) return res.send(404);
//   await activity.remove();
//   return res.status(204).send(activity);
// }));



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