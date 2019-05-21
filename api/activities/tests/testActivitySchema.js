import should from 'should';
import actsModel from '../actsModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('Activity model test', () => {

    let act = {};
    //create a post with random user id before each test
    beforeEach(() => {
        const id = mongoose.Types.ObjectId().toString(); //generates pseudo random ObjectID 
        act = {
            user: id,
            title: "A title",
            url: "random.com"
        };
    })

    it('should validate a post with a user and title', (done) => {
        // const post={user: "5ca22a64816cd8423c27214d", title: "A title"};
        const m = new actsModel(act);
        m.validate((err) => {
           should.not.exist(err);
           m.title.should.equal(act.title);
            m.user.toString().should.equal(act.user);
        //    m.title.should.equal("A title");
        //    m.user.toString().should.equal("5ca22a64816cd8423c27214d");
           done();
        });
    });
    
    it('should require a user and title', (done) => {

        const wrongact={url: "qaz.cbn.xom"};
        const m = new actsModel(wrongact);
        
        m.validate((err) => {
           const errors = err.errors;
           errors.should.have.property("user");
           errors.should.have.property("title");
           done();
        });
    });

  


});



