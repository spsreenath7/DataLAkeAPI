import should from 'should';
import userModel from '../userModel';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';

const sinonTest = sinonTestFactory(sinon);

describe('userModelTests', () => {
    it('should require a username and password', (done) => {

        const user={auser: "This is not valid"};
        const m = new userModel(user);
        
        m.validate((err) => {
           should.exist(err);
           const errors = err.errors;
           errors.should.have.property("username");
           errors.should.have.property("password");
           done();
        });
    });

    it('should validate a user with a username and password', (done) => {   
        const username="fxwalsh";
        const password="pass";

        const user={username: username, password: password};
        const m = new userModel(user);
        m.validate((err) => {
           should.not.exist(err);
           m.username.should.equal(username);
           m.password.should.equal(password);
           done();
        });
    });

    it('should search using username', sinonTest(function() {
        this.stub(userModel, 'findOne');
        const username="fxwalsh";
        const password="pass";

        const user={username: username, password: password};

     
        userModel.findByUserName(username);
     
        sinon.assert.calledWith(userModel.findOne, {
            username: username
        });
    })); 

    it('should detect matching passwords', sinonTest(function (done) {

        const username = "fxwalsh";
        const password = "$2a$10$hxklBTD1KLdYOCrulbtf8OKxjxFEc5WBCODCCCYGb67udslRc0mHi";

        const user1 = {
            username: username,
            password: password
        };

        const user2 = {
            username: username,
            password: password
        };

        const m1 = new userModel(user1);
        const m2 = new userModel(user2);

        m1.comparePassword(m2.password, (err, result) => {
                should.not.exist(err);
                result.should.be.true;
                done();
            }


        )
    }));

    it('should reject incorrect passwords', function(done) {
        
        const username="fxwalsh";
        const password1="$2a$10$hxklBTD1KLdYOCrulbtf8OKxjxFEc5WBCODCCCYGb67udslRc0mHi";
        const password2="$2a$10$SHxM7TRWShaNrJN1IDoOduBDmcll5sSJmYN9RHFjuGxP/iZr8Y4pe";

        const user1={username: username, password: password1};

        const user2={username: username, password: password2};

        const m1 = new userModel(user1);
        const m2 = new userModel(user2);

        m1.comparePassword(m2.password,(err,result)=>{
            
            should.not.exist(err);
            result.should.not.be.true;
            done();
        }
     
      
    )}); 

   // it('should encrypt the password on pre Save', sinonTest(function(done) {
        
    //    const username="fxwalsh";
//        const password="pass";

  //      const user={username: username, password: password};

        //userModel.prototype.save = function(){ done()}

    //    const m = new userModel(user);

      //  this.stub(m, 'save').callsFake(function(cb){ cb(null,this)}); //stop it saving to the db
        
    //    m.save();
      

        
      
   // }));

});