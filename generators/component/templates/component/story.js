/* global module */

import { define } from 'skatejs';
import h from '../../stories/render';
import { storiesOf } from '@storybook/react';

import CoverageInfo from './component.js';
define(CoverageInfo);

storiesOf('<%= className %>', module)
  .add('it renders', () => (
    <<%= componentName %>></<%= componentName %>>
  ));
