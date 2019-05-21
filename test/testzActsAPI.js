import supertest from 'supertest';
import {
  app
} from '../index.js';
import should from 'should';
import asyncHandler from 'express-async-handler';

describe('Data Lake Activity API test', function () {
  this.timeout(120000);
  let token = null;
  const badToken = 'Bearer 123abc';
  const testUser = {};
  const testAct = { title: "Some random title to test", url: "www.npm.com" };
  let testact_id = null;

  before((done) => {
    testUser.username = 'user1';
    testUser.password = 'test1';
    // calling home page api
    supertest(app)
      .post('/api/users')
      .send({ username: 'user1', password: 'test1' })
      .expect(200)
      .then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal(true);
        token = res.body.token;
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should get a list of activities', (done) => {

    supertest(app)
      .get('/api/acts')
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(200).then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should not return activities without valid token', async () => {

    const res = await supertest(app)
      .get('/api/acts')
      .set('Authorization', badToken)
      .expect(401).catch(err => {
        console.error(err);
        throw err;
      });
    res.should.have.property('status').equal(401);
  });

  it('should add a new activity', (done) => {

    supertest(app)
      .post('/api/acts')
      .set('Authorization', token)
      .send(testAct)
      .expect(201)
      .then((res) => {
        res.should.have.property('status').equal(201);
        testact_id = res.body.activity._id;
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });
  it('should get the newly added activity by _id', (done) => {

    supertest(app)
      .get('/api/acts/' + testact_id)
      .set('Authorization', token)
      .expect(201).then((res) => {
        res.should.have.property('status').equal(201);
        console.log("==============resp json===========================");
        console.log(res.body);
        res.body.activity.should.have.property('_id');
        res.body.activity.url.should.equal("www.npm.com");
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should delete the newly added activity by _id', (done) => {

    supertest(app)
      .delete('/api/acts/' + testact_id)
      .set('Authorization', token)
      .expect(204).then((res) => {
        res.should.have.property('status').equal(204);
        // console.log("==============resp json===========================");
        // console.log(res.body);
        // res.body.activity.should.have.property('_id');
        // res.body.activity.url.should.equal("www.npm.com");
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });
  });

  it('should not return the any activity for _id', async () => {

    supertest(app)
      .get('/api/acts/' + testact_id)
      .set('Authorization', token)
      .expect('Content-type', /json/)
      .expect(401).then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(401);
        // res.body.activity.should.not.have.property('_id');
        done();
      }).catch((error) => {
        console.error("Failed", error);
        done(error);
      });

    //     const res = await supertest(app)
    //         .get('/api/acts/'+"randomid")
    //         .set('Authorization', token)
    //         .expect(401).catch(err => {
    //             console.error(err);
    //             throw err;
    //         });
    //     res.should.have.property('status').equal(401);
    //     res.body.success.should.be.false;
    // });

  });

});

