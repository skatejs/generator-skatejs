import { expect } from 'chai';
import { h, mount } from 'bore';

describe('<%= componentName %> component', function() {
  it('renders', function() {
    return mount(<<%= componentName %>></<%= componentName %>>).wait((wrapper) => {
      const { node: p } = wrapper.one('p');

      expect(p.innerHTML).to.equal('Hello, world! I am <%= componentName %>!');
    });
  });
});
