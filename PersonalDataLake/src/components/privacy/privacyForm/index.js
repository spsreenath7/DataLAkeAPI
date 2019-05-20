import React, { Component } from 'react';

export default class PrivacyForm extends Component {
    state = { title: '', link: ''};

    handleTitleChange = (e) =>  this.setState({title: e.target.value});
    handleLinkChange = (e) => this.setState({link: e.target.value});

    handleSubmit = (e) => {
        e.preventDefault();
        let title = this.state.title.trim();
        let link = this.state.link.trim();
        if (!title) {
            return;
        }
        console.log("handleAdd called ============");
        this.props.handleAdd(title,link);
        this.setState({title: '', link: ''});
    }

    render() {
        return (
           
        <form style={{marginTop: '30px'}}>
           <h3>New privacy policy</h3>
           <div className="form-group">
              <input type="text"
                className="form-control"
                value={this.state.title}
                placeholder="policy name" onChange={this.handleTitleChange}></input>
           </div>
           <div className="form-group">
               <input type="text"
                 className="form-control"
                 value={this.state.link}
                placeholder="Descrpition" onChange={this.handleLinkChange}></input>
           </div>
           <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
        </form>
        
        
        );
    }
}

