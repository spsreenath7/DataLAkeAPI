import supertest from 'supertest';
import {
    app
} from '../index.js';
import should from 'should';
import {
    isPrimitive
} from 'util';

const testUser = {};
const invalidUser = {};
const noUser = {};


// UNIT test begin
describe('Users API test', function () {
    this.timeout(120000);
    // test #1: return a collection of json documents
    before((done) => {
        testUser.username = 'user1';
        testUser.password = 'test1';
        invalidUser.username = 'chancer1';
        invalidUser.password = 'bad1';
        done();
    });

    it('should register a user', (done) => {

        const newUser = {
            username: "fred",
            password: "apassword"
        };

        supertest(app)
            .post('/api/users')
            .send(newUser)
            .query({
                action: 'register'
            })
            .expect('Content-type', /json/)
            .expect(201) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(201);
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });

    it('should return a user token for valid user', () => {

        return supertest(app)
            .post('/api/users')
            .send(testUser)
            .expect('Content-type', /json/)
            .expect(200) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(200);
                res.body.success.should.be.true;
                res.body.token.should.exist; 
            }).catch((error) => {
                console.error("Failed", error);
                throw error;
            });
    });

    it('should return a user token for valid user', async () => {

        const res = await supertest(app)
            .post('/api/users')
            .send(testUser)
            .expect('Content-type', /json/)
            .expect(200).catch(err => {
                console.error(err);
                throw err;
            });
        res.should.have.property('status').equal(200);
        res.body.success.should.be.true;
        res.body.token.should.exist;
    });

    it('should not return a token for invalid user', (done) => {

        supertest(app)
            .post('/api/users')
            .send(invalidUser)
            .expect('Content-type', /json/)
            .expect(401) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(401);
                res.body.success.should.be.false;
                should.not.exist(res.body.token);
                done();
            }).catch((error) => {
                console.error("Failed", error);
                done(error);
            });
    });


    // it('should require a user name and password', async () => {

    //     const noUser = {
    //         username: "",
    //         password: ""
    //     };
    //     const res = await supertest(app)
    //         .post('/api/users')
    //         .send(noUser)
    //         .expect(401)
    //         .catch(err => {
    //             console.error(err);
    //             throw err;
    //         });
    //     res.should.have.property('status').equal(401);
    //     res.body.success.should.be.false;
    // });

});