'use strict';

const assert = require('assert');
const classify = require('../../lib/classify');

describe('lib: classify', function() {
  describe('transforming kebab-case strings', function() {
    it('handles a simple example', function() {
      assert.equal(classify('x-foo'), 'XFoo');
    });

    it('handles multiple kebabs', function() {
      assert.equal(classify('my-really-cool-component'), 'MyReallyCoolComponent');
    });

    it('handles a string with no kebabs', function() {
      assert.equal(classify('foo'), 'Foo');
    });
  });
});

