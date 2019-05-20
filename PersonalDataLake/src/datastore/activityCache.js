import _ from 'lodash';

class ActivityCache {
    constructor() {
        this.acts = [] ;
        
        }
    

    getAll() {
        return this.acts ;
    }

    getUser() {
        return this.currentuser ;
    }

    populateActs(activities) {
        this.acts = activities;
        console.log("Inside poplate user :")
        console.log(this.acts);
    }

    // updateProfile(profile)
    // {
    //     this.currentuser.profile = profile;
    // }

    // getProfile(){
    //     return this.currentuser.profile;
    // }

    // populate(acts) {
    //     this.acts = acts;
    // }

    delete(k) {
        _.remove(this.acts, 
            (act) => act.id === k
        );
        
    }

    add(newact) {
        
        this.acts.push(newact);
    }

    update(updatedact) {
        let index = _.findIndex(this.acts, 
            (act) => act.id === updatedact.id
        );      
        if (index !== -1) {
            this.acts.splice(index, 1, 
                {
                    id: updatedact.id,
                    userid: updatedact.userid,
                    title: updatedact.title,
                    url: updatedact.url,
                    date: updatedact.date,
                    catogery: updatedact.catogery ,
                    privacy: updatedact.privacy 
                }) ;
            return true ;
        }
        return false ;
    }
}
export default (new ActivityCache() );
