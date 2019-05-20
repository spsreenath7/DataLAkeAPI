import React, { Component } from 'react';
import Activity from '../activity';
import './activityList.css';

export default class ActivityList extends Component {
    render() {
      console.log("inside actList render");
      console.log(this.props.activities);
      let actList=[this.props.activities];
      let activityCards =   this.props.activities.map(
        (act) => <Activity activity={act} 
                  deleteHandler={this.props.deleteHandler}
                  editHandler={this.props.editHandler} /> 
    );
      return (
        <div className="col-md-10">
          <ul className="activities">
          {activityCards}
          </ul>
        </div>
      ) ;
  }
}