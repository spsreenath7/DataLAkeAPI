import { configure, addDecorator } from '@storybook/react';

function loadStories() {
  require('../stories/personalDataLake.js');
}

configure(loadStories, module);