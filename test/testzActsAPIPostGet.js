// import supertest from 'supertest';
// import {
//   app
// } from '../index.js';
// import should from 'should';
// import asyncHandler from 'express-async-handler';

// describe('Data Lake  activittyAPI POST and GET by id test', function () {
//     this.timeout(120000);
//     let token = null;
//     const badToken = 'Bearer 123abc';
//     const testUser = {};
//     const testAct = { title: "Some random title to test", url: "www.npm.com" };
//     let testact_id = null;
  
//     before((done) => {
//       testUser.username = 'user1';
//       testUser.password = 'test1';
//       // calling home page api
//       supertest(app)
//         .post('/api/users')
//         .send({username:'user1',password:'test1'})
//         .expect(200)
//         .then((res) => {
//           // HTTP status should be 200
//           res.should.have.property('status').equal(200);
//           res.body.should.have.property('success').equal(true);
//           token = res.body.token;
//           done();
//         }).catch((error) => {
//           console.error("Failed", error);
//           done(error);
//         });
  
        
//     });
    
  
  
//   });
  