import test from 'ava';
import classify from '../../lib/classify';

test('handles a simple example', (t) => {
  t.is(classify('x-foo'), 'XFoo');
});

test('handles multiple kebabs', (t) => {
  t.is(classify('my-really-cool-component'), 'MyReallyCoolComponent');
});

test('handles a string with no kebabs', (t) => {
  t.is(classify('foo'), 'Foo');
});
