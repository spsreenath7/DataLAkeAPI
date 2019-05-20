import supertest from 'supertest';
import {
    app
} from '../index.js';
import should from 'should';
import asyncHandler from 'express-async-handler';

describe('Data Lake privacy API GET all test', function () {
    this.timeout(120000);
    let token = null;
    const badToken = 'Bearer sdass';
    const testUser = {};

    before((done) => {
        testUser.username = 'user1';
        testUser.password = 'test1';
        
        supertest(app)
            .post('/api/privacy')
            .send(testUser)
            .expect(200)
            .then((res) => {
                
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
            .get('/api/posts')
            .set('Authorization', badToken)
            .expect(401).catch(err => {
                console.error(err);
                throw err;
            });
        res.should.have.property('status').equal(401);
    });



});


describe('Data Lake  privacyAPI POST and GET by id test', function () {
    this.timeout(120000);
    let token = null;
    const testUser = {};
    const testPrivacy = { label: "tjshdk", statement: "raw text " };
    let testprivacy_id = null;

    before((done) => {
        testUser.username = 'user1';
        testUser.password = 'test1';
        // calling home page api
        supertest(app)
            .post('/api/users')
            .send(testUser)
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

        supertest(app)
            .post('/api/privacy')
            .set('Authorization', token)
            .send(testPrivacy)
            .expect(200)
            .then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.should.have.property('success').equal(true);
                testprivacy_id = res.activity._id;
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should get the privacy added newly', (done) => {

        supertest(app)
            .get('/api/privacy/' + testprivacy_id)
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .expect(200).then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.should.have.property('_id');
                res.body.label.should.equal("tjshdk");
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should not return the any activity', async () => {

        supertest(app)
            .get('/api/privacy/' + "randomid")
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .expect(200).then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.activity.should.not.have.property('_id');
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });

});

});

describe('Data Lake privacyAPI Add rules to privacy', function () {
    this.timeout(120000);
    let token = null;
    const testUser = {};
    const testPrivacy = { label: "sample", statement: "sample raw text " };
    const testRule = { catogery: "work", level: "high" };
    let testprivacy_id = null;

    before((done) => {
        testUser.username = 'user1';
        testUser.password = 'test1';
        // calling home page api
        supertest(app)
            .post('/api/users')
            .send(testUser)
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

        supertest(app)
            .post('/api/privacy')
            .set('Authorization', token)
            .send(testPrivacy)
            .expect(200)
            .then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.should.have.property('success').equal(true);
                testprivacy_id = res.activity._id;
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should add rule to the privacy', (done) => {

        supertest(app)
            .post('/api/privacy/' + testprivacy_id+'/rules')
            .set('Authorization', token)
            .send(testRule)
            .expect('Content-type', /json/)
            .expect(200).then((res) => {
                // HTTP status should be 200                
                res.body.rules[0].have.property('_id');
                res.body.rules[0].catogery.should.equal("work");
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

});