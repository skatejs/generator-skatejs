import { Component, define, h } from 'skatejs';

import style from '../../util/style.js';
import css from './styles.scss';

export default class <%= className %> extends Component {
  /**
   * @property {string} is defines the component as <%= componentName %>
   */
  static get is() {
    return '<%= componentName %>';
  }

  renderCallback() {
    return (
      <div>
        { style(this, css) }
        <p class="text">
          Hello, world! I am <%= componentName %>!
        </p>
      </div>
    );
  }
}

define(<%= className %>);
