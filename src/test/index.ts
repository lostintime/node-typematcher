import {expect} from 'chai';
import {
  isAny, isArrayOf, isBoolean, isFiniteNumber, isNever, isNumber, isObject,
  isString
} from "../lib";

describe('Matchers', () => {

  describe('isAny', () => {

    it('should match any input', () => {
      expect(isAny(false)).equals(true);
      expect(isAny(NaN)).equals(true);
      expect(isAny(Infinity)).equals(true);
      expect(isAny(10)).equals(true);
      expect(isAny(1.3)).equals(true);
      expect(isAny("string")).equals(true);
      expect(isAny({})).equals(true);
      expect(isAny([])).equals(true);
      expect(isAny(null)).equals(true);
      expect(isAny(undefined)).equals(true);
    });
  });

  describe('isNever', () => {

    it('should never match any input', () => {
      expect(isNever(false)).equals(false);
      expect(isNever(NaN)).equals(false);
      expect(isNever(Infinity)).equals(false);
      expect(isNever(10)).equals(false);
      expect(isNever(1.3)).equals(false);
      expect(isNever("string")).equals(false);
      expect(isNever({})).equals(false);
      expect(isNever([])).equals(false);
      expect(isNever(null)).equals(false);
      expect(isNever(undefined)).equals(false);
    });
  });

  describe('isString', () => {

    it('should match string input', () => {
      expect(isString("aloha")).equals(true);
      expect(isString('aloha2')).equals(true);
    });

    it('should match String object input', () => {
      expect(isString(new String(""))).equals(true);
    });

    it('should not match other types', () => {
      expect(isString(false)).equals(false);
      expect(isString(NaN)).equals(false);
      expect(isString(Infinity)).equals(false);
      expect(isString(10)).equals(false);
      expect(isString(1.3)).equals(false);
      expect(isString({})).equals(false);
      expect(isString([])).equals(false);
      expect(isString(null)).equals(false);
      expect(isString(undefined)).equals(false);
    });
  });

  describe('isNumber', () => {

    it('should match number input', () => {
      expect(isNumber(10)).equals(true);
      expect(isNumber(3.4)).equals(true);
      expect(isNumber(-0.8843)).equals(true);
    });

    it('should match NaN and Infinity', () => {
      expect(isNumber(NaN)).equals(true);
      expect(isNumber(Infinity)).equals(true);
    });

    it('should not match other types', () => {
      expect(isNumber(false)).equals(false);
      expect(isNumber({})).equals(false);
      expect(isNumber(null)).equals(false);
      expect(isNumber("100")).equals(false);
      expect(isNumber(undefined)).equals(false);
    });
  });

  describe('isFiniteNumber', () => {

    it('should match number input', () => {
      expect(isFiniteNumber(10)).equals(true);
      expect(isFiniteNumber(3.4)).equals(true);
      expect(isFiniteNumber(-0.8843)).equals(true);
    });

    it('should not match NaN and Infinity', () => {
      expect(isFiniteNumber(NaN)).equals(false);
      expect(isFiniteNumber(Infinity)).equals(false);
    });

    it('should not match other types', () => {
      expect(isFiniteNumber(false)).equals(false);
      expect(isFiniteNumber({})).equals(false);
      expect(isFiniteNumber(null)).equals(false);
      expect(isFiniteNumber(undefined)).equals(false);
    });
  });

  describe('isBoolean', () => {

    it('should match boolean values', () => {
      expect(isBoolean(true)).equals(true);
      expect(isBoolean(false)).equals(true);
    });

    it('should not match other types', () => {
      expect(isBoolean(NaN)).equals(false);
      expect(isBoolean(Infinity)).equals(false);
      expect(isBoolean(1)).equals(false);
      expect(isBoolean(0)).equals(false);
      expect(isBoolean(1.3)).equals(false);
      expect(isBoolean("true")).equals(false);
      expect(isBoolean({})).equals(false);
      expect(isBoolean([])).equals(false);
      expect(isBoolean(null)).equals(false);
      expect(isBoolean(undefined)).equals(false);
    });
  });

  describe('isObject', () => {

    it('should match any object', () => {
      expect(isObject({})).equals(true);
      expect(isObject([])).equals(true);
      expect(isObject(new String(""))).equals(true);
      expect(isObject(new Number(10))).equals(true);
      expect(isObject(new Boolean(true))).equals(true);
      expect(isObject(() => "")).equals(true);
    });

    it('should not match other types', () => {
      expect(isObject(10)).equals(false);
      expect(isObject(0.2)).equals(false);
      expect(isObject("")).equals(false);
      expect(isObject(false)).equals(false);
      expect(isObject(NaN)).equals(false);
      expect(isObject(Infinity)).equals(false);
      expect(isObject(null)).equals(false);
      expect(isObject(undefined)).equals(false);
    });
  });

  describe('isArrayOf', () => {

    it('should match empty arrays', () => {
      expect(isArrayOf(isNumber)([])).equals(true);
      expect(isArrayOf(isFiniteNumber)([])).equals(true);
      expect(isArrayOf(isAny)([])).equals(true);
      expect(isArrayOf(isNever)([])).equals(true);
      expect(isArrayOf(isBoolean)([])).equals(true);
      expect(isArrayOf(isString)([])).equals(true);
      expect(isArrayOf(isObject)([])).equals(true);
    });

    it('should match arrays with all values valid', () => {
      expect(isArrayOf(isNumber)([1, 2, 3, 5.6, NaN, Infinity])).equals(true);
      expect(isArrayOf(isString)(["one", "two", "three"])).equals(true);
      expect(isArrayOf(isBoolean)([true, new Boolean(false)])).equals(true);
      expect(isArrayOf(isArrayOf(isFiniteNumber))([[1], [2], [3]])).equals(true);
    });

    it('should not match arrays containing invalid values', () => {
      expect(isArrayOf(isNumber)(["one", "two", 3])).equals(false);
      expect(isArrayOf(isFiniteNumber)([10, NaN, 20])).equals(false);
      expect(isArrayOf(isFiniteNumber)([12, 15, Infinity, 19])).equals(false);
      expect(isArrayOf(isArrayOf(isFiniteNumber))([[1], [2], [1, 2, "three"]])).equals(false);
    });

    it('should not match other types', () => {
      expect(isArrayOf(isAny)(NaN)).equals(false);
      expect(isArrayOf(isAny)(Infinity)).equals(false);
      expect(isArrayOf(isAny)(1)).equals(false);
      expect(isArrayOf(isAny)(0)).equals(false);
      expect(isArrayOf(isAny)(1.3)).equals(false);
      expect(isArrayOf(isAny)("true")).equals(false);
      expect(isArrayOf(isAny)({})).equals(false);
      expect(isArrayOf(isAny)(null)).equals(false);
      expect(isArrayOf(isAny)(undefined)).equals(false);
    })
  });


});

describe('Match DSL', function () {
  // TODO test matching DSL
});
