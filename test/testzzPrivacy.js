import supertest from 'supertest';
import {
    app
} from '../index.js';
import should from 'should';
import asyncHandler from 'express-async-handler';

describe('Data Lake privacy API test', function () {
    this.timeout(120000);
    let token = null;
    const badToken = 'Bearer sdass';
    const testUser = {};
    const testPrivacy = { label: "cuurent privacy", statement: "this is sample stmt" };
    const testRule = { catogery: "work", level: "medium" };
    let testprivacy_id = null;

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

    it('should get the privacy list', (done) => {

        supertest(app)
            .get('/api/privacy')
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

    it('should prevent access to privacy without valid token', async () => {

        const res = await supertest(app)
            .get('/api/privacy')
            .set('Authorization', badToken)
            .expect(401).catch(err => {
                console.error(err);
                throw err;
            });
        res.should.have.property('status').equal(401);
    });

    it('should add a new privacy option', (done) => {

        supertest(app)
            .post('/api/privacy')
            .set('Authorization', token)
            .send(testPrivacy)
            .expect(201)
            .then((res) => {
                res.should.have.property('status').equal(201);
                res.body.privacy.should.have.property('_id');
                testprivacy_id = res.body.privacy._id;
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should get the newly added privacy by _id and check for default rule', (done) => {

        supertest(app)
            .get('/api/privacy/' + testprivacy_id)
            .set('Authorization', token)
            .expect(200).then((res) => {
                res.should.have.property('status').equal(200);
                console.log("==============resp json===========================");
                console.log(res.body);
                console.log(" res.body.privacy.rules.length ="+res.body.privacy.rules.length);
                console.log("==============resp json===========================");
                res.body.privacy.label.should.equal("cuurent privacy");
                res.body.privacy.rules.length.should.equal(1);
                res.body.privacy.rules[0].should.have.property('_id');
                res.body.privacy.rules[0].catogery.should.equal("any");
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should add rule to the privacy', (done) => {

        supertest(app)
            .post('/api/privacy/' + testprivacy_id + '/rules')
            .set('Authorization', token)
            .send(testRule)
            .expect(201).then((res) => {
                res.should.have.property('status').equal(201);
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should get privacy by _id and check for newly added rule', (done) => {

        supertest(app)
            .get('/api/privacy/' + testprivacy_id)
            .set('Authorization', token)
            .expect(200).then((res) => {
                res.should.have.property('status').equal(200);
                console.log("==============resp json===========================");
                console.log(res.body);
                console.log(" res.body.privacy.rules.length ="+res.body.privacy.rules.length);
                console.log("==============resp json===========================");
                res.body.privacy.rules.length.should.equal(2);
                res.body.privacy.rules[1].catogery.should.equal(testRule.catogery);
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should delete privacy by _id', (done) => {

        supertest(app)
            .delete('/api/privacy/' + testprivacy_id)
            .set('Authorization', token)
            .expect(204).then((res) => {
                res.should.have.property('status').equal(204);
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should not return the any privacy for _id', async () => {

        supertest(app)
            .get('/api/privacy/' + testprivacy_id)
            .set('Authorization', token)
            .expect(401).then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(401);
                // res.body.activity.should.not.have.property('_id');
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });

    });
});
