import {expect} from 'chai';
import {
  hasFields,
  isAny, isArrayOf, isBoolean, isFiniteNumber, isMissing, isNever, isNull, isNumber, isObject,
  isString, isUndefined, isValue
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

  describe('isValue', () => {

    it('should exactly match values', () => {
      expect(isValue(10)(10)).equals(true);
      expect(isValue("one")('one')).equals(true);
      expect(isValue(true)(true)).equals(true);
      expect(isValue(Infinity)(Infinity)).equals(true);
      const x = new String("hello");
      expect(isValue(x)(x)).equals(true);
    });

    it('should not match values with different types', () => {
      expect(isValue("10")(10)).equals(false);
      expect(isValue(0)(false)).equals(false);
      expect(isValue(1)(true)).equals(false);
      expect(isValue(NaN)(NaN)).equals(false);
    });

    it('should not match different values with same type', () => {
      expect(isValue("10")("20")).equals(false);
      expect(isValue(1)(1.1)).equals(false);
      expect(isValue(true)(false)).equals(false);
    });

    it('should not match different object instances', () => {
      expect(isValue(new String("hello"))(new String("hello"))).equals(false);
      expect(isValue(new Number(10))(new Number(10))).equals(false);
    });
  });

  describe('isNull', () => {

    it('should match for null', () => {
      expect(isNull(null)).equals(true);
    });

    it('should not match for values other than null', () => {
      expect(isNull(NaN)).equals(false);
      expect(isNull(Infinity)).equals(false);
      expect(isNull(1)).equals(false);
      expect(isNull(0)).equals(false);
      expect(isNull(1.3)).equals(false);
      expect(isNull("true")).equals(false);
      expect(isNull(false)).equals(false);
      expect(isNull({})).equals(false);
      expect(isNull(undefined)).equals(false);
    });
  });

  describe('isUndefined', () => {

    it('should match for undefined', () => {
      expect(isUndefined(undefined)).equals(true);
    });

    it('should not match for values other than undefined', () => {
      expect(isUndefined(NaN)).equals(false);
      expect(isUndefined(Infinity)).equals(false);
      expect(isUndefined(1)).equals(false);
      expect(isUndefined(0)).equals(false);
      expect(isUndefined(1.3)).equals(false);
      expect(isUndefined("true")).equals(false);
      expect(isUndefined(false)).equals(false);
      expect(isUndefined({})).equals(false);
      expect(isUndefined(null)).equals(false);
    });
  });

  describe('isMissing', () => {

    it('should match for null or undefined', () => {
      expect(isMissing(null)).equals(true);
      expect(isMissing(undefined)).equals(true);
    });

    it('should not match for non null or undefined values', () => {
      expect(isMissing(NaN)).equals(false);
      expect(isMissing(Infinity)).equals(false);
      expect(isMissing(1)).equals(false);
      expect(isMissing(0)).equals(false);
      expect(isMissing(1.3)).equals(false);
      expect(isMissing("true")).equals(false);
      expect(isMissing(false)).equals(false);
      expect(isMissing({})).equals(false);
    });
  });

  describe('hasFields', () => {

    it('should match empty matcher/object', () => {
      expect(hasFields({})({})).equals(true);
    });

    it('should accept extra fields', () => {
      expect(hasFields({})({one: 1, two: 2})).equals(true);
    });

    it('should match object with matching fields', () => {
      expect(hasFields({key: isNumber})({key: 10})).equals(true);
      expect(hasFields({x: isValue(10)})({x: 10})).equals(true);
      expect(hasFields({name: isString})({x: 10, y: 20, name: "testing"})).equals(true);
      expect(hasFields({a: isValue("one"), b: isValue(20), c: isNull})({
        a: "one",
        b: 20,
        c: null
      })).equals(true);
    });

    it('should match missing fields for undefined matcher', () => {
      expect(hasFields({key: isUndefined})({value: "aloha"})).equals(true);
      expect(hasFields({key: isUndefined, value: isUndefined})({})).equals(true);
    });

    it('should not match objects with missing fields', () => {
      expect(hasFields({key: isNumber})({})).equals(false);
      expect(hasFields({key: isNumber, value: isString})({value: "aloha"})).equals(false);
    });

    it('should not match objects with wrong field types', () => {
      expect(hasFields({key: isNumber})({key: "10"})).equals(false);
      expect(hasFields({key: isValue("20")})({key: "10"})).equals(false);
      expect(hasFields({key: isNumber, value: isNumber})({
        key: 10,
        value: "wrong number"
      })).equals(false);
    });
  });

  describe('isTuple1', () => {

  });

  describe('isTuple2', () => {

  });

  describe('isTuple3', () => {

  });

  describe('isTuple4', () => {

  });

  describe('isTuple5', () => {

  });

  describe('isTuple6', () => {

  });

  describe('isTuple7', () => {

  });

  describe('isTuple8', () => {

  });

  describe('isTuple9', () => {

  });

  describe('isTuple10', () => {

  });

  describe('isBoth', () => {

  });

  describe('isEither', () => {

  });

  describe('isOptional', () => {

  });

  describe('isNullable', () => {

  });

});


describe('Match DSL', function () {
  // TODO test matching DSL
});
