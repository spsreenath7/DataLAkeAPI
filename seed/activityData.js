import actsModel from '../api/activities/actsModel';
import userModel from '../api/users/userModel';
import privacyModel from '../api/privacy/privacyModel';

const acts = [
  {
    title: 'India - Tiger population sees 30% increase.',
    url: 'http://www.bbc.com/news/world-asia-30896028',
    username: 'jbloggs',
    catogery: "politics",
    privacy: "high"
  },
  {

    title: 'The button that is not.',
    url: 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
    username: 'notme',
    catogery: "politics",
    privacy: "high"
  },
  {

    title: 'Google Nears $1B Investment in SpaceX',
    url: 'www.google.com',
    username: 'notme',
    catogery: "politics",
    privacy: "high"
  },
  {

    title: 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
    url: 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
    username: 'psmith',
    catogery: "politics",
    privacy: "high"
  },
];

const privacy = [
  {
    label: 'last year',
    statement: 'privacy for previous year',
    rules: []
  },
  {
    label: 'sample setting',
    statement: 'hjhhgjh for ghjjjjj hgg',
    rules: []
  },
  {
    label: 'special allow',
    statement: 'dasdsda for previous year',
    rules: []
  },
  {
    label: 'cuurent',
    statement: 'privacy used now',
    rules: []
  }
];

const users = [{
  'username': 'user1',
  'password': 'test1',
},
{
  'username': 'user2',
  'password': 'test2',
},
];

// export const loadActs = () => {
//   actsModel.find({}).remove(function () {
//     actsModel.collection.insert(acts, (err, docs) => {
//       if (err) {
//         console.log(`failed to Load activity Data`);
//       } else {
//         console.info(`${acts.length} acts were successfully stored.`);
//       }
//     });
//   });
// };

export default async function loadActs() {

  try {
      await userModel.deleteMany();
      //Save user data to db
      const user1 = await new userModel(users[0]).save();
      const user2 = await new userModel(users[1]).save();

      //assign users randomly to each post
      acts.forEach((act)=>{act.user = ((Math.random<0.5)?user1._id : user2._id)});
      privacy.forEach((p)=>{p.user = ((Math.random<0.5)?user1._id : user2._id)});

      await privacyModel.deleteMany();
      await privacyModel.collection.insertMany(privacy);
     
      await actsModel.deleteMany();
      await actsModel.collection.insertMany(acts);
      console.info(`${acts.length} posts were successfully stored.`);

      console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
  }
}