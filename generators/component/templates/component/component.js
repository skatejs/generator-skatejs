import style from '../../util/style.js';
import css from './styles.scss';

const { Component, h } = skate;

export default class extends Component {
  /**
   * @property {string} is defines the component as <%= componentName %>
   */
  static get is() {
    return '<%= componentName %>';
  }

  renderCallback() {
    return [
      style(this, css),
      <p class="text">
        Hello, world! I am <%= componentName %>!
      </p>
    ];
  }
}
