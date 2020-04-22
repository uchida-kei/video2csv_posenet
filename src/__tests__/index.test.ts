import { hello } from '../index';

test('print Hello Test', () => {
  expect(hello('End')).toBe('Process End');
});
