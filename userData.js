import userModel from './api/users/userModel';

const users = [{
        'username': 'user1',
        'password': 'test1',
    },
    {
        'username': 'user2',
        'password': 'test2',
    },
];


export default async function loadUsers() {

    try {
        await userModel.deleteMany();
        new userModel(users[0]).save();
        new userModel(users[1]).save();
        console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
        console.error(`failed to Load user Data: ${err}`);
    }
}