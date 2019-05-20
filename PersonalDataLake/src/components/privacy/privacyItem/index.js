import React, { Component } from 'react';
import './newsItem.css';
import { Link } from 'react-router-dom';

export default class PrivacyItem extends Component {
    handleVote = () => {
        console.log("----------------------------------------");
        console.log("this.props.post._id " + this.props.post._id);
        console.log(this.props.post);
        this.props.upvoteHandler(this.props.post._id);
    } 

render() {

    return (
        <div >
        <span className="glyphicon glyphicon-remove ptr" onClick={this.handleVote}/>
            
        <span className="newsitem" >
        <Link to={`/privacyrules/${this.props.privacy._id}`}>{ this.props.privacy.label} </Link> :- {this.props.privacy.statement}
        </span>
        </div>  
        );
    }
} 