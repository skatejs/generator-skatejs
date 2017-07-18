/* global module */

import { define } from 'skatejs';
import h from '../../stories/render';
import { storiesOf } from '@storybook/react';

import <%= className %> from './component.js';
define(<%= className %>);

storiesOf('<%= className %>', module)
  .add('it renders', () => (
    <<%= componentName %>></<%= componentName %>>
  ));
