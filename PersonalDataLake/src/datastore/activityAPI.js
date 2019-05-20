import _ from 'lodash';
import request from 'superagent';
import cuid from 'cuid';

class ActivityAPI {
    constructor() {
       
    }
 

    async getAll()
    {
        // console.log("inside poplate");
        
        
            console.log("inside async");
            let res = await request.get('http://localhost:3001/acts');
            console.log(res);
            // .end((error, res) => {
            //     if (res) {
                    
            //         console.log(this.activities);
            //         return true;
            //     } else {
            //         console.log(error);
            //     }
            // });

            let acts=[];
            acts = JSON.parse(res.text);
                    // localCache.populate(friends);
                    this.activities=acts;

            console.log("After populate :");
            console.log(this.activities);
       
    }

    async delete(k) {

         await this.populate();
        // let delindex = _.findIndex(this.activities, 
        //     (act) => act.url === k
        // );
        console.log("item to be deletd "+k);
        // console.log(this.activities[delindex]);
        let deleteurl='http://localhost:3001/acts/'+k;
        console.log(deleteurl);
       let res = await request.delete(deleteurl);
    //    .end((error, res) => {
    //         if (res) {
    //             console.log("success!");
    //         } else {
    //             console.log(error);
    //         }
    //     });
    console.log("Delete result");
    console.log(res);
    //  this.populate();
    }



    add(t,u,d,c,p) {
        // let temp1=this.populate();
        // let actid = _.maxBy(this.activities, 'id').id ;
        let actid=cuid();
        console.log("Add Item : "+actid);
        // actid=actid+1;
        request.post('http://localhost:3001/acts').send({
            id: actid,
            title: t,
            url: u,
            date: d,
            catogery: c,
            privacy: p
        }).end((error, res) => {
            if (res) {
                console.log("Success");
            } else {
                console.log(error);
            }
        });
        // let temp2=this.populate();

    }

    // update(key,t,u,d,c,p) {
    //     // let temp1=this.populate();
    //     let index = _.findIndex(this.activities, 
    //         (act) => act.url === key
    //     );      
    //     let updatid=this.activities[index].id;
    //     let updateurl='http://localhost:3001/acts/'+updatid;
    //     request.put(updateurl).send({
    //         id: updatid,
    //         title: t,
    //         url: u,
    //         date: d,
    //         catogery: c,
    //         privacy: p
    //     }).end((error, res) => {
    //         if (res) {
    //             console.log("success!");
    //         } else {
    //             console.log(error);
    //         }
    //     });
    //     let temp2=this.populate();
    // }
}

export default (new ActivityAPI() );