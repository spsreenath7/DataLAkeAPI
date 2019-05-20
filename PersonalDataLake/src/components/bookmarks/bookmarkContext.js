import React, { Component } from 'react';

// first we will make a new context
export default MyContext = React.createContext({
    items: [],
    bookmark : (item) =>{
        items.push(item);
    }
});

