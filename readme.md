# Assignment 2 - Web app using React, Nodea and Express.

Name: Sreenath S P

# Personal data store

## Overview.

This app is developed to serve as a user interface for a personal data store. Here users can store, manage and control the usage of personal data. So this can help users manage their privacy of personal data.


 . . . . . List of user features  . . . . 
 
 + User SignUp/Login
 + Update user profile
 + Add create , update and delete activity
 + Create custom items
 + Control the data sharing with privacy dashboard  
 

## Installation requirements.

Note: All the required node modules are saved in package.json, so no seperate installation of modules required. To run the app first start the local JSON server and then start the npm. NPM is started for both client and server seperately.

npm start

## Data Model Design.

![][model]

## App Component Design.

A screenshot showing the component stories from Storybook  


## UI Design.

![][image1]
![][image2]
![][image4]
![][image6]
![][image8]
![][image9]

## Routing.

public views

+ /user/login - login page
+ /user/signup - new user signup page
+ /contact - basic contact page
+ / -About the app

private views (require login)

+ /home/ - user home once logged in.
+ /home/profile - displays user profile also allowed to edit.
+ /home/pds - dispalyes the various personal data stored for the user, under three areas and allowed to add a custom item.
+ /home/privacy - dipalyes the privacy options created by you.

# Web API Endpoint Reference
Base URL: localhost:8080/api
The above service offer API to operate a personal data store, which involes endpoints to user login/signup, allowing to view, modify/delete  or add a item to their activities. Allow offers endpoints to add and modify their privacy options. Here each privacy options can be saved with a set of rules.

## Web API Install and Operation
Below the below commmand is added to start script in package.json. 
    nodemon --ignore PersonalDataLake/* --exec babel-node index.js

+ Here nodemon is a dev-dependency used to automatically restart the node application when file changes in the directory are detected.
+ And babel-node is a cli used to transpile and compile ES6 js code, to make it back ward compatible.

## API Design

+ /api/users
    + GET : fetches all the users
    + POST : when user name and password are passed, it does authentication and return jwt token for the session(action=regster registers the user)

+ /api/acts
    + GET : fetches activities all the activities for the current user.
    + POST : add a new activity for the user

+ /api/acts/{actid}
    + GET : fetches activity based on the activity id 
    + PUT : add a new activity for the user 
    + DELETE : romves the activity

+ /api/privacy
    + GET : fetches activities all the privacy options for the current user.
    + POST : add a new privacy option for the user

+ /api/privacy/{privacyid}
    + GET : returns activity based on the privacy id passed
    + DELETE : removes the privacy option

+ /api/privacy/{privacyid}/rules
    + POST : appends a new rule to privacy

## API Configuration
Below is the configuration for development environment. Here hostname and port to run the node app in dev machine and the database connection option is declred in .env file.

NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb://localhost:27017/contacts_db
seedDb=true
secret=mySecret

## Security and Authentication

In Users API, mongoose schema is enabled with pre configuration to encrypt the password using 'Bcrypt' and salting is done for the encrypted password. This pre config allows to protect the password when ever the user sign-up to the site.

Using Users API whenever a user signup/login a jwt token is created and sent along with the response body. For further Activity and Privacy API calls this token must be passed. Here 'passport' a express middleware service is used to check the validity for the session based on the token passed.

The endpoints that involves this token based authentication are /api/privacy and /api/acts.

## Testing

Unit testing and Integration testing is done for the individual API end points. 
Unit testing involves test cases that validates the moongose models. Here each endpoint's corresponding model contains a set of test cases that test the their functionality. Sinon.js is used to stub the model calls that involves DB interaction, so that we can verfy only whether modelcalls the correct method to access the DB.

![][testingimage1]

Integration testing is done by testing each API with a script containing a sequences of tests based API calls. 'Supertest' is used to test individual API calls. For example below script invoves sequence of /api/users endpoint tests, ender each tests a subset of validations are performed to check whether the API works as expedted.

+ should add a new activity
+ should get the newly added activity by _id
    calls the /api/acts/:actid and check activity created in the previous test.
+ should delete the newly added activity by _id
+ should not return the any activity for _id 

![][testingimage2]

## Extra features

+ New user registeration and authentication.
+ All user and app data is stored in mongo NoSQL database and retrived using rest API exposed using Node and express middleware.
+ Used componentDidMount which is invoked to load the user profile and activity data  immediately after their respective component is mounted.
+ To enhance user experience, used third party components like antd and reactstrap. Also utilised the proptypes supported by those components to achieve the required fearture. 
+ Detailed Integration testing for API end points used and required unit testing is done for moongose models.
+ Unit test and integration test reports are genrated using 'mochawesome' for futher analysis and sharing. 


## Independent learning.

+ Learnt Fire base authentication and applied it in user login/signup
+ Used third party components, by refering their API docs. Below are those
https://reactstrap.github.io/
https://ant.design/docs/react/introduce



[model]: ./images/datamodel.PNG
[image1]: ./images/login.PNG
[image2]: ./images/signup.PNG
[image4]: ./images/profile.PNG
[image6]: ./images/activityList.PNG
[image8]: ./images/createitem.PNG
[image9]: ./images/privacyscreen.PNG
[testingimage1]: ./images/unitTest.PNG
[testingimage2]: ./images/integTest.PNG
