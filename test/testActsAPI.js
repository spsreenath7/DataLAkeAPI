import supertest from 'supertest';
import {
    app
} from '../index.js';
import should from 'should';
import asyncHandler from 'express-async-handler';

describe('Data Lake activittyAPI GET all activity test', function () {
    this.timeout(120000);
    let token = null;
    const badToken = 'Bearer 123abc';
    const testUser = {};

    before((done) => {
        testUser.username = 'user1';
        testUser.password = 'test1';
        
        supertest(app)
            .post('/api/users')
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

    it('should prevent access to activities without valid token', async () => {

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

describe('Data Lake  activittyAPI POST and GET by id test', function () {
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
            .post('/api/acts')
            .set('Authorization', token)
            .send(testAct)
            .expect(200)
            .then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.should.have.property('success').equal(true);
                testact_id = res.activity._id;
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should get the newly added activity', (done) => {

        supertest(app)
            .get('/api/acts/' + testact_id)
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .expect(200).then((res) => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                res.body.activity.should.have.property('_id');
                res.body.activity.url.should.equal("www.npm.com");
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should not return the any activity', async () => {

        supertest(app)
            .get('/api/acts/' + testact_id)
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