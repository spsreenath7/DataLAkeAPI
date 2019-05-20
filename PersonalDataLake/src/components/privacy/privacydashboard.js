import React from 'react';
import { CustomInput, Form, FormGroup, Label, Button } from 'reactstrap';
import PrivacyForm from './privacyForm';
import PrivacyList from './privacyList';
import * as api from '../../api';
import _ from 'lodash';

export default class PrivacyDashboard extends React.Component {
  state = { privacy: [{}], login: false };
  _isMounted = false;

  async componentDidMount() {
      this._isMounted = true
      try {
          const resp = await api.getPrivacy();
          if (this._isMounted) {
              this.setState({
                privacy: resp,
                  login: false,
              });
          }

      } catch (e) {
          if (this._isMounted) this.setState({
              login: true
          });
      }
  };

  componentWillUnmount() {
      this._isMounted = false;
  }


  addPrivacyItem = (label, statement) => {
      console.log("inside addNewsItem  ============");
      api.addPrivacy(label, statement)
          .then(resp => {
              console.log(" resp ===================");
              console.log(resp);
              const newPrivacy = { "_id": resp.privacy._id, "label": label, "statement": statement, "upvotes": 0, "comments": [] };
              this.setState({ posts: this.state.privacy.concat([newPrivacy]) });
              console.log(newPrivacy);
              console.log(" resp end ===================");
          }).catch(console.error)
  };

  incrementUpvote = (id) => {
      console.log("----------------------------------------");
      console.log(this.state.posts.length);
      console.log(this.state);
      console.log(id);
      api.upvote(id).then(resp => {
          var upvotedPost = _.find(this.state.posts, post => post._id === id);
          console.log(this.state.posts.length);
          upvotedPost.upvotes++;
          this.setState({})
      });
  };

  render() {
      const privacylist = this.state.privacy;
      return (
          <div className="container">

              <div className="row">
                  <div className="col-md-9 col-md-offset-1">
                      <PrivacyList privacylist={privacylist} upvoteHandler={this.incrementUpvote} />
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-9 col-md-offset-1">
                      <PrivacyForm handleAdd={this.addPrivacyItem} />
                  </div>
              </div>
              
          </div>

      );
  }
}