import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import privacyRouter from './api/privacy';
import usersRouter from './api/users';
import actsRouter from './api/activities';
import bodyParser from 'body-parser';
import loadContacts from './contactsData';
import loadPrivacy from './privacyData';
import loadUsers from './userData';
import {loadActs} from './activityData';
import './db';
import passport from './auth';



dotenv.config();

export const app = express(); 

// if (app.get('env') == 'development'){ dotenv.config(); }

const port = process.env.PORT;

// if (process.env.seedDb) {
//   loadContacts();
//   loadPrivacy();
//   loadUsers();
//   loadActs();
// }

app.use(passport.initialize());


//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/api/privacy', passport.authenticate('jwt', {
  session: false
}), privacyRouter);

// app.use('/api/privacy',  privacyRouter);

app.use('/api/acts', passport.authenticate('jwt', {
  session: false
}),  actsRouter);

app.use('/api/users', usersRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});