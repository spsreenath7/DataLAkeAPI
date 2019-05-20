    import React from 'react';
    import _ from 'lodash';
    import { withRouter } from 'react-router-dom';


    // class Form extends React.Component {
    //     state = { comment: '', name: ''};

    //     handleCommentChange = (e) => {
    //         this.setState({comment : e.target.value});
    //     };

    //     handleNameChange = (e) => {
    //         this.setState({name: e.target.value});
    //     };

    //     onSubmit = (e) => {
    //         e.preventDefault();
    //         let comment = this.state.comment.trim();
    //         let name = this.state.name.trim();
    //         if (!comment ) {
    //             return;
    //         }
    //         this.props.commentHandler(comment,name );
    //         this.setState({comment: '', name: ''});
    //     };

    //     render() {
    //         return (
    //             <form  style={{marginTop: '30px'}}>
    //                 <h3>Add a new comment</h3>

    //                 <div className="form-group">
    //                     <input type="text"  className="form-control"
    //                         placeholder="Comment" value={this.state.comment}
    //                         onChange={this.handleCommentChange} ></input>
    //                 </div>     
    //                 <div className="form-group">
    //                     <input type="text"  className="form-control"
    //                         placeholder="Your name" value={this.state.name}
    //                         onChange={this.handleNameChange} ></input>
    //                 </div>
    //                 <button type="submit" className="btn btn-primary"
    //                     onClick={this.onSubmit}>Submit</button>
    //             </form>
    //         );
    //     }
    // }

    // class Rule extends React.Component {
    //     handleVote = () => {
    //         this.props.upvoteHandler(this.props.rule.id);
    //     };
    //     render() {
    //         let lineStyle = {
    //             fontSize: '20px', marginLeft: '10px'  };
    //         return (
    //             <div>
    //                 <span className="glyphicon glyphicon-remove"
    //                     onClick={this.handleVote}></span>
    //                  - by {this.props.rule.catogery}
    //                 <span style={lineStyle} >
    //                     {this.props.rule.level}
    //                 </span>
    //             </div>                
    //         );
    //     }
    // }

    // const RulesList = ( {rules, upvoteHandler} )  => {
    //     let items = rules.map(
    //         (rule,index) =>  <Rule key={index} rule={rule} 
    //                                     upvoteHandler={upvoteHandler}  />
    //     );
    //     return (
    //         <div>
    //             {items}
    //         </div>
    //     );
    // };

    class RulesView extends React.Component {


        // async componentDidMount() {
        //     this._isMounted = true
        //     try {
        //         const resp = await api.getPrivacy();
        //         if (this._isMounted) {
        //             this.setState({
        //               privacy: resp,
        //                 login: false,
        //             });
        //         }
      
        //     } catch (e) {
        //         if (this._isMounted) this.setState({
        //             login: true
        //         });
        //     }
        // };

        // addComment = (comment, name) => {
        //     let pid = parseInt( this.props.match.params.post_id, 10);
        //     api.addComment(pid,comment ,name );
        //     this.setState({});
        // };

        // incrementUpvote = (commentId) => {
        //     let pid = parseInt( this.props.match.params.post_id, 10);
        //     api.upvoteComment(pid,commentId) ;
        //     this.setState({});
        // };

        // render() {
        //     let pid = parseInt(this.props.match.params.privacyid,10) ;
        //     let post = api.getPost(pid);
        //     let line = null ;
        //     if (post.link ) {
        //         line = <a href={post.link}>{post.title} </a> ;
        //     } else {
        //         line = <span>{post.title} </span> ;
        //     }
        //     let comments = _.sortBy(post.comments, 
        //          (comment) => - comment.upvotes
        //        ); 
        //     return (  
        //     <div className="container">
        //       <div className="row">
        //         <div className="col-md-9 col-md-offset-1">
        //             <h3>{line} </h3>
        //             <RulesList rules={rules} 
        //                 upvoteHandler={this.incrementUpvote } />
        //             <Form post={post}  commentHandler={this.addComment} /> 
        //             </div>
        //                           </div>
        //         </div>
        //     );
        // }
    }

    export default withRouter(RulesView);