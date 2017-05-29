/* global module, require */

import 'skatejs-web-components';
import { configure } from '@storybook/react';

// Load `story.js` files
const req = require.context('../src', true, /.story.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
