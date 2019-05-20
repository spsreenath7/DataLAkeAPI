import React, { Component } from 'react';
import PrivacyItem from '../privacyItem';
import './newsList.css'

export default class PrivacyList extends Component {
    render() {
      console.log("Re-render===================");
        let displayedNewsItems =  this.props.privacylist.map( 
            (item) => <PrivacyItem key={item._id} privacy={item} upvoteHandler={this.props.upvoteHandler}/>
         ) ; 
        return (
          <div className="col-md-10">
            <ul className="posts">
                {displayedNewsItems}
            </ul>
          </div>
        );
    }
}