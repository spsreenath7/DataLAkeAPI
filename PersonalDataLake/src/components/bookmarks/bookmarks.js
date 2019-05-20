import React, { Component } from 'react';
import MyProvider from './bookmarkContext';

class Bookmarks extends Component {
    render() {
      return (
        <div className="person">
          <MyProvider.Consumer>
            {(context) => (
              <React.Fragment>
                  
                  {context.items}
              </React.Fragment>
            )}
          </MyProvider.Consumer>
        </div>
      )
    }
  }