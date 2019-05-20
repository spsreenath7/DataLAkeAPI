import should from 'should';
import privacyModel from '../privacyModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('privacy model test', () => {

    let privacy = {};
    
    beforeEach(() => {
        const id = mongoose.Types.ObjectId().toString(); //generates pseudo random ObjectID 
        privacy = {
            user: id,
            label: "privacy1"
        };
    })

    it('should validate a privacy with a label and user ', (done) => {
        const m = new privacyModel(privacy);
        m.validate((err) => {
            should.not.exist(err);
            m.label.should.equal(privacy.label);
            m.user.toString().should.equal(privacy.user);
            done();
        });
    });

    it('should require a user and title', (done) => {

        const incorrectPrivacy = {
            statement: " this privacy statement"
        };
        const m = new privacyModel(incorrectPrivacy);
        m.validate((err) => {
            const errors = err.errors;
            errors.should.have.property("label");
            errors.should.have.property("user");
            done();
        });
    });



    it('should be able to add a rule to privacy', function (done) {
        const m = new privacyModel(privacy);
        m.rules.push({
            catogery: "work",
            level: "low"
        });
        m.validate((err) => {
            should.not.exist(err);
            m.rules[0].catogery.should.equal("work");
            m.rules[0].level.should.equal("low");
            done();
        });
    });

    it('should require a both catogery and level to add a rule to privacy', function (done) {
        const m = new privacyModel(privacy);
        m.rules.push({
            level: "high"
        });
        m.validate((err) => {
            should.exist(err);
            const errors = err.errors;
            errors.should.have.property("rules.0.catogery");
            
            done();
        });
    });

});