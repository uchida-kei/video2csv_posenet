import { countFile } from '../util';

test('0 count test', () => {
  expect(countFile('', '')).toBe(0);
});
