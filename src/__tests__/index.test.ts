import { hello } from '../index';

test('print Hello Test', () => {
  expect(hello('Test')).toBe('Hello Test');
});
