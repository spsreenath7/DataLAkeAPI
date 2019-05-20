import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import ActivityList from './activities/activityList';
// import PhoneList from './components/phoneList'  src\datastore\activityAPI.js
import activityAPI from '../../datastore/activityAPI';
import localCache from '../../datastore/localCache';
import activityCache from '../../datastore/activityCache';
import CreateItem from './create/createItem';
import TransList from './finance/transList';
import request from 'superagent';

import * as api from '../../api';
import Auth from '../../auth';
import _ from 'lodash';



export default class PersonalDataTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.state = {
      acts: [{}],
      activeTab: '1'
    };
  }
  //  componentDidMount() {

  //   let userid=this.props.match.params.userid;
  //   let actsurl=`http://localhost:3001/activities?userid=${userid}`
  //   request.get(actsurl)
  //           .end((error, res) => {
  //               if (res) {
  //                 console.log("Sucess");
  //                   let acts = JSON.parse(res.text);
  //                   activityCache.populateActs(acts);
  //                   console.log(acts);
  //                   this.setState({time:Date.now()});
  //               } else {
  //                   console.log(error);
  //               }
  //           });
  // }

  async componentDidMount() {
    this._isMounted = true
    try {
        const resp = await api.getAllActs();
        if (this._isMounted) {
            this.setState({
                acts: resp
            });
        }

    } catch (e) {
        if (this._isMounted) this.setState({
            
        });
    }
};

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('shouldComponentUpdate ');
//     return true;
//     // if (this.props.list.length === nextProps.list.length ) {
//     //     console.log('FALSE shouldComponentUpdate of FilteredFriendList')
//     //     return false ;
//     // } else {
//     //     console.log('TRUE shouldComponentUpdate of FilteredFriendList')
//     //     return true ;
//     // }     
// }

  // editActivity = (act) => {
  //   let updateurl=`http://localhost:3001/activities/${act.id}`;
  //       request.put(updateurl).send(act).end((error, res) => {
  //           if (res) {
  //               console.log(" request success!");
  //               console.log(activityCache.update(act));
  //               this.setState({time:Date.now()});
  //           } else {
  //               console.log(error);
  //           }
  //       });
  // };

  editActivity = (act) => {
    console.log("inside addNewsItem  ============");
    console.log(act);
    api.updateAct(act)
        .then(resp => {
            console.log(" resp ===================");
            console.log(resp);
            const newAct = { "_id": resp.act._id, "title": act.title, "url": act.url, "catogery": act.catogery, "privacy": act.privacy };
            const index = _.findIndex(this.acts, 
              (act) => act.id === newAct.id
          );
          this.state.acts.splice(index, 1, newAct) ;
            this.setState({ acts: this.state.acts });
            console.log(newAct);
            console.log(" resp end ===================");
        }).catch(console.error)
};

  // deleteActivity = (id) => {
  //   let actsurl=`http://localhost:3001/activities/${id}`
  //   request.delete(actsurl).end((error, res) => {
  //           if (res) {
  //               console.log(" delete success!");
  //               // console.log(localCache.getAll());
  //               console.log("local delete!");
  //               activityCache.delete(id);
  //               console.log("after local delte!");
  //               // console.log(localCache.getAll());
  //               this.setState({time:Date.now()});
  //           } else {
  //               console.log(error);
  //           }
  //       });
  // };
  deleteActivity = (actid) => {
    console.log("inside addNewsItem  ============");
    api.deleteAct(actid)
        .then(resp => {
            console.log(" resp ===================");
            console.log(resp);
            // const newAct = { "_id": resp.act._id, "title": act.title, "url": act.url, "catogery": act.catogery, "privacy": act.privacy };
            _.remove(this.state.acts, 
              (a) => a._id === actid
          );
            this.setState({ acts: this.state.acts });
            // console.log(newAct);
            console.log(" resp end ===================");
        }).catch(console.error)
};

  // addActivity = (act) => {
  //   let addurl= `http://localhost:3001/activities/`;  //'http://localhost:3001/acts/';
  //       request.post(addurl).send(act).end((error, res) => {
  //           if (res) {
  //               console.log("addActivity request success!");
  //               activityCache.add(act);
  //               console.log(activityCache.getAll());
  //               this.setState({time:Date.now()});
  //           } else {
  //               console.log(error);
  //           }
  //       });
  // };
  addActivity = (act) => {
    console.log("inside addNewsItem  ============");
    api.addAct(act)
        .then(resp => {
            console.log(" resp ===================");
            console.log(resp);
            const newAct = { "_id": resp.activity._id, "title": act.title, "url": act.url, "catogery": act.catogery, "privacy": act.privacy };
            
            this.setState({ acts: this.state.acts.concat([newAct]) });
            console.log(newAct);
            console.log(" resp end ===================");
        }).catch(console.error)
};

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    
    let activities =this.state.acts;

    console.log("in perstab render");
    console.log(activities);
    return (
      <div>
        <CreateItem addActivity={this.addActivity} userid={this.props.match.params.userid}/>
        <Nav tabs>
          <NavItem className={this.state.activeTab === '1' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('1'); }}
            >
              Activities
            </NavLink>
          </NavItem>
          <NavItem className={this.state.activeTab === '2' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('2'); }}
            >
              Travel
            </NavLink>
          </NavItem>
          <NavItem className={this.state.activeTab === '3' ? 'active' : ''}>
            <NavLink
              onClick={() => { this.toggle('3'); }}
            >
              Finance
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ActivityList activities={activities}
            editHandler={this.editActivity}
            deleteHandler={this.deleteActivity} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              {/* <ActivityList activities={activities}
            editHandler={this.editActivity}
            deleteHandler={this.deleteActivity} /> */}
            <TransList />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

  