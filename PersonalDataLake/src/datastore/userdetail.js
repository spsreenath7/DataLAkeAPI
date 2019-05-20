import _ from 'lodash';

class UserdetailAPI {
    constructor() {

        this.users = [
            {
                'userid': 101,
                'name': 'Mark',
                'email': 'random@some.com',
                'gender': 'male',
                'contact': '0810198765'
            },        
            {
                'userid': 102,
                'name': 'Philly',
                'email': 'random1@some.com ',
                'gender': 'female',
                'contact': '0899723765'
            }
        ] ; 
    }

    delete(k) {
        let elements = _.remove(this.users, 
            (user) => user.email === k
        );
        return elements; 
    }

    getUserByEmail(key) {
        let index = _.findIndex(this.users, 
            (user) => user.email === key
        );
        // let user =_.get(this.users, (user) => user.email === key);
        let user = this.users[index];

        return user;
    }

    get(key) {
        let index = _.findIndex(this.users, 
            (user) => user.userid === key
        );
        console.log("inside get user : key "+index+" "+key);
        console.log(this.users);
        // let user =_.get(this.users, (user) => user.email === key);
        let user = this.users[index];
        console.log(user);
        return user;
    }

    getAll() {
        return this.users ;
    }

    add(n,e,g,c) {
        
        
        let maxid = _.maxBy(this.users, 'userid').userid ;
        
        let newid=maxid+1;
        console.log("New userid : "+newid);
        let len = this.users.length ;
        let newLen = this.users.push({
            userid: 110,
            name: n,
            email: e,
            gender: g,
            contact: c 
        }) ;
        console.log("new lwngth: "+newLen);
        return newLen > len ;
    }

    update(key,n,e,g,c) {
        let index = _.findIndex(this.users, 
            (user) => user.email === key
        );      
        if (index !== -1) {
            this.users.splice(index, 1, 
                {
                    userid: this.users[index].userid,
                    name: n,
                    email: e,
                    gender: g,
                    contact: c  
                }) ;
            return true ;
        }
        return false ;
    }
}

export default (new UserdetailAPI() );