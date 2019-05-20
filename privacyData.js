import privacyModel from './api/privacy/privacyModel';

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
export default async function loadPrivacy() {
  try {
    await privacyModel.deleteMany();
    await privacyModel.collection.insertMany(privacy);
    console.info(`${privacy.length} posts were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load posts: ${err}`);
  }
};