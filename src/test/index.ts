import {expect} from 'chai';
import {isNumber, isAny} from "../lib";

describe('Matchers', function () {
  describe('isAny', function () {
    it('should match any input', function () {
      expect(isAny(false)).equals(true);
      expect(isAny(NaN)).equals(true);
      expect(isAny(Infinity)).equals(true);
      expect(isAny(10)).equals(true);
      expect(isAny(1.3)).equals(true);
      expect(isAny("string")).equals(true);
      expect(isAny({})).equals(true);
      expect(isAny(null)).equals(true);
      expect(isAny(undefined)).equals(true);
    });
  });
  // TODO test other matchers
});

describe('Match DSL', function () {
  // TODO test matching DSL
});
