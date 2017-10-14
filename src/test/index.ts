import {expect} from 'chai';
import {
  hasFields,
  isAny, isArrayOf, isBoolean, isFiniteNumber, isMissing, isNever, isNull, isNumber, isObject,
  isString, isUndefined, isValue,
  isTuple1, isTuple2, isTuple3, isTuple4, isTuple5, isTuple6, isTuple7, isTuple8, isTuple9,
  isTuple10, isBoth, isEither, isOptional, isNullable,
  match, caseWhen, caseAny, caseDefault, caseThrow, caseId, failWith,
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
      expect(hasFields({length: isNumber})([])).equals(true);
      expect(hasFields({length: isValue(2)})([1, 2])).equals(true);
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

    it('should not match other types', () => {
      const hf = hasFields({});
      expect(hf(NaN)).equals(false);
      expect(hf(Infinity)).equals(false);
      expect(hf(1)).equals(false);
      expect(hf(0)).equals(false);
      expect(hf(1.3)).equals(false);
      expect(hf("true")).equals(false);
      expect(hf(false)).equals(false);
    });
  });

  describe('isTuple1', () => {
    const isT1 = isTuple1(isNumber);
    it('should match on valid tuples', () => {
      expect(isT1([10])).equals(true);
      expect(isTuple1(isString)(["test"])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT1([1, 2])).equals(false);
      expect(isT1([])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT1(NaN)).equals(false);
      expect(isT1(Infinity)).equals(false);
      expect(isT1(1)).equals(false);
      expect(isT1(0)).equals(false);
      expect(isT1(1.3)).equals(false);
      expect(isT1("true")).equals(false);
      expect(isT1(false)).equals(false);
      expect(isT1({})).equals(false);
    });
  });

  describe('isTuple2', () => {
    const isT2 = isTuple2(isNumber, isString);
    it('should match on valid tuples', () => {
      expect(isT2([10, "ten"])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT2([1, "one", 2])).equals(false);
      expect(isT2([1])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT2(NaN)).equals(false);
      expect(isT2(Infinity)).equals(false);
      expect(isT2(1)).equals(false);
      expect(isT2(0)).equals(false);
      expect(isT2(1.3)).equals(false);
      expect(isT2("true")).equals(false);
      expect(isT2(false)).equals(false);
      expect(isT2({})).equals(false);
    });
  });

  describe('isTuple3', () => {
    const isT3 = isTuple3(isNumber, isString, isBoolean);
    it('should match on valid tuples', () => {
      expect(isT3([10, "ten", false])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT3([1, "one", true, 2])).equals(false);
      expect(isT3([1, "one"])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT3(NaN)).equals(false);
      expect(isT3(Infinity)).equals(false);
      expect(isT3(1)).equals(false);
      expect(isT3(0)).equals(false);
      expect(isT3(1.3)).equals(false);
      expect(isT3("true")).equals(false);
      expect(isT3(false)).equals(false);
      expect(isT3({})).equals(false);
    });
  });

  describe('isTuple4', () => {
    const isT4 = isTuple4(isNumber, isString, isBoolean, isNumber);
    it('should match on valid tuples', () => {
      expect(isT4([10, "ten", false, 2])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT4([1, "one", true, 2, ""])).equals(false);
      expect(isT4([1, "one", true])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT4(NaN)).equals(false);
      expect(isT4(Infinity)).equals(false);
      expect(isT4(1)).equals(false);
      expect(isT4(0)).equals(false);
      expect(isT4(1.3)).equals(false);
      expect(isT4("true")).equals(false);
      expect(isT4(false)).equals(false);
      expect(isT4({})).equals(false);
    });
  });

  describe('isTuple5', () => {
    const isT5 = isTuple5(isNumber, isString, isBoolean, isNumber, isNumber);
    it('should match on valid tuples', () => {
      expect(isT5([10, "ten", false, 2, 3])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT5([1, "one", true, 2, 3, ""])).equals(false);
      expect(isT5([1, "one", true, 2])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT5(NaN)).equals(false);
      expect(isT5(Infinity)).equals(false);
      expect(isT5(1)).equals(false);
      expect(isT5(0)).equals(false);
      expect(isT5(1.3)).equals(false);
      expect(isT5("true")).equals(false);
      expect(isT5(false)).equals(false);
      expect(isT5({})).equals(false);
    });
  });

  describe('isTuple6', () => {
    const isT6 = isTuple6(isNumber, isString, isBoolean, isNumber, isNumber, isString);
    it('should match on valid tuples', () => {
      expect(isT6([10, "ten", false, 2, 3, "s"])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT6([1, "one", true, 2, 3, "s", ""])).equals(false);
      expect(isT6([1, "one", true, 2, 3])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT6(NaN)).equals(false);
      expect(isT6(Infinity)).equals(false);
      expect(isT6(1)).equals(false);
      expect(isT6(0)).equals(false);
      expect(isT6(1.3)).equals(false);
      expect(isT6("true")).equals(false);
      expect(isT6(false)).equals(false);
      expect(isT6({})).equals(false);
    });
  });

  describe('isTuple7', () => {
    const isT7 = isTuple7(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull);

    it('should match on valid tuples', () => {
      expect(isT7([10, "ten", false, 2, 3, "s", null])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT7([1, "one", true, 2, 3, "s", null, ""])).equals(false);
      expect(isT7([1, "one", true, 2, 3, "s"])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT7(NaN)).equals(false);
      expect(isT7(Infinity)).equals(false);
      expect(isT7(1)).equals(false);
      expect(isT7(0)).equals(false);
      expect(isT7(1.3)).equals(false);
      expect(isT7("true")).equals(false);
      expect(isT7(false)).equals(false);
      expect(isT7({})).equals(false);
    });
  });

  describe('isTuple8', () => {
    const isT8 = isTuple8(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull, isBoolean);

    it('should match on valid tuples', () => {
      expect(isT8([10, "ten", false, 2, 3, "s", null, true])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT8([1, "one", true, 2, 3, "s", null, true, ""])).equals(false);
      expect(isT8([1, "one", true, 2, 3, "s", null])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT8(NaN)).equals(false);
      expect(isT8(Infinity)).equals(false);
      expect(isT8(1)).equals(false);
      expect(isT8(0)).equals(false);
      expect(isT8(1.3)).equals(false);
      expect(isT8("true")).equals(false);
      expect(isT8(false)).equals(false);
      expect(isT8({})).equals(false);
    });
  });

  describe('isTuple9', () => {
    const isT9 = isTuple9(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull, isBoolean, isString);

    it('should match on valid tuples', () => {
      expect(isT9([10, "ten", false, 2, 3, "s", null, true, "9"])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT9([1, "one", true, 2, 3, "s", null, true, "9", ""])).equals(false);
      expect(isT9([1, "one", true, 2, 3, "s", null, true])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT9(NaN)).equals(false);
      expect(isT9(Infinity)).equals(false);
      expect(isT9(1)).equals(false);
      expect(isT9(0)).equals(false);
      expect(isT9(1.3)).equals(false);
      expect(isT9("true")).equals(false);
      expect(isT9(false)).equals(false);
      expect(isT9({})).equals(false);
    });
  });

  describe('isTuple10', () => {
    const isT10 = isTuple10(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull, isBoolean, isString, isValue(3));

    it('should match on valid tuples', () => {
      expect(isT10([10, "ten", false, 2, 3, "s", null, true, "9", 3])).equals(true);
    });

    it('should not match different size tuples', () => {
      expect(isT10([1, "one", true, 2, 3, "s", null, true, "9", 3, ""])).equals(false);
      expect(isT10([1, "one", true, 2, 3, "s", null, true, "9"])).equals(false);
    });

    it('should not match other types', () => {
      expect(isT10(NaN)).equals(false);
      expect(isT10(Infinity)).equals(false);
      expect(isT10(1)).equals(false);
      expect(isT10(0)).equals(false);
      expect(isT10(1.3)).equals(false);
      expect(isT10("true")).equals(false);
      expect(isT10(false)).equals(false);
      expect(isT10({})).equals(false);
    });
  });

  describe('isBoth', () => {
    it('should match when both matches', () => {
      expect(isBoth(isNumber, isValue(10))(10)).equals(true);
      expect(isBoth(hasFields({key: isString}), hasFields({value: isValue(10)}))({
        key: "key",
        value: 10
      })).equals(true);
    });

    it('should not match when one does\'t match', () => {
      expect(isBoth(isNumber, isValue(20))(30)).equals(false);
      expect(isBoth(isString, isNumber)(10)).equals(false)
    });
  });

  describe('isEither', () => {
    it('should match when one matches', () => {
      expect(isEither(isNumber, isValue(20))(10)).equals(true);
      expect(isEither(isNumber, isString)(10)).equals(true);
      expect(isEither(isNumber, isString)("str")).equals(true);
    });

    it('should not match when none match', () => {
      expect(isBoth(isNumber, isValue(20))("str")).equals(false);
      expect(isBoth(isString, isValue(30))(10)).equals(false)
    });
  });

  describe('isOptional', () => {
    it('should match for valid value or undefined', () => {
      expect(isOptional(isNumber)(10)).equals(true);
      expect(isOptional(isString)(undefined)).equals(true);
      expect(isOptional(isNever)(undefined)).equals(true);
    });

    it('should not match for other types', () => {
      expect(isOptional(isValue(-1))(NaN)).equals(false);
      expect(isOptional(isValue(-1))(Infinity)).equals(false);
      expect(isOptional(isValue(-1))(1)).equals(false);
      expect(isOptional(isValue(-1))(0)).equals(false);
      expect(isOptional(isValue(-1))(1.3)).equals(false);
      expect(isOptional(isValue(-1))("true")).equals(false);
      expect(isOptional(isValue(-1))(false)).equals(false);
      expect(isOptional(isValue(-1))({})).equals(false);
      expect(isOptional(isValue(-1))(null)).equals(false);
    });
  });

  describe('isNullable', () => {
    it('should match for valid value or null', () => {
      expect(isNullable(isNumber)(10)).equals(true);
      expect(isNullable(isString)(null)).equals(true);
      expect(isNullable(isNever)(null)).equals(true);
    });

    it('should not match for other types', () => {
      expect(isNullable(isValue(-1))(NaN)).equals(false);
      expect(isNullable(isValue(-1))(Infinity)).equals(false);
      expect(isNullable(isValue(-1))(1)).equals(false);
      expect(isNullable(isValue(-1))(0)).equals(false);
      expect(isNullable(isValue(-1))(1.3)).equals(false);
      expect(isNullable(isValue(-1))("true")).equals(false);
      expect(isNullable(isValue(-1))(false)).equals(false);
      expect(isNullable(isValue(-1))({})).equals(false);
      expect(isNullable(isValue(-1))(undefined)).equals(false);
    });
  });

  describe('failWith', () => {
    it('will return true on match', () => {
      expect(failWith(new Error('Invalid value, string expected'))(isString)("aloha"))
        .equals(true, 'new matcher returns true');
    });

    it('will throw on matcher miss', () => {
      expect(() => failWith(new Error('Invalid value, string expected'))(isString)(10))
        .to.throw('Invalid value, string expected');
    });
  });
});


describe('Match DSL', function () {
  describe('match', () => {
    it('will return first matched case value', () => {
      expect(match(10)(caseId(isValue(10))))
        .equals(10, 'caseId returns input value if matched');

      expect(match(10)(caseWhen(isString)(s => `got string ${s}`), caseWhen(isNumber)(n => `got number ${n}`)))
        .equals("got number 10", 'returned first matched');

      expect(match("hello")(caseWhen(isNumber)(n => ""), caseAny(v => `got value "${v}"`)))
        .equals('got value "hello"', 'caseAny matches any value');

      expect(match(333)(caseDefault(() => 20), caseId(isNumber)))
        .equals(20, 'caseDefault returns first');
    });

    it('will throw if no case matched', () => {
      expect(() => match(10)()).throws();
      expect(() => match("hello")(caseWhen(isNumber)(n => n * 2))).throws();
    });
  });

  describe('matchWith', () => {
    it('will return first matched case value', () => {
      expect(match(15)(caseId(isValue(15))))
        .equals(15, 'caseId returns input value if matched');
    });

    it('will throw if no case matched', () => {
      expect(() => match(true)()).throws();
      expect(() => match("aloha")(caseWhen(isNumber)(n => n * 2))).throws();
    });
  });

  describe('caseWhen', () => {
    it('will return CaseMatch on match', () => {
      const m = caseWhen(isNumber)(n => n * 2)(10);
      expect(isObject(m)).equals(true, 'CaseMatch is an object');
      expect(hasFields({match: isValue(20)})(m)).equals(true, 'CaseMatch has "match" field with valid 20');
    });

    it('will return CaseMiss on match fail', () => {
      const m = caseWhen(isString)(s => `${s}:${s}`)(20);
      expect(isValue(false)(m)).equals(true, 'CaseMiss is a boolean false');
    });
  });

  describe('caseId', () => {
    it('will pass input value on match', () => {
      expect(match(10)(caseId(isNumber))).equals(10);
      expect(match("test")(caseId(isValue("test")))).equals("test");
    });

    it('will throw if not matched', () => {
      expect(() => match(10)(caseId(isString))).throws();
    });
  });

  describe('caseAny', () => {
    it('will return CaseMatch on an value', () => {
      expect(hasFields({match: isString})(caseAny(v => `${v}`)(10))).equals(true);
      expect(hasFields({match: isString})(caseAny(v => `${v}`)(""))).equals(true);
      expect(hasFields({match: isString})(caseAny(v => `${v}`)(true))).equals(true);
    })
  });

  describe('caseDefault', () => {
    it('will return handler result', () => {
      expect(hasFields({match: isValue("a")})(caseDefault(() => "a")(null))).equals(true);
    });
  });

  describe('caseThrow', () => {
    it('will not throw when just called', () => {
      expect(() => caseThrow(new Error('This should not be thrown'))).to.not.throw();
    });

    it('will not throw if matched before', () => {
      expect(() => match(10)(caseId(isNumber), caseThrow(new Error('Fail if not number'))))
        .to.not.throw();
    });

    it('will throw given error', () => {
      expect(() => match(10)(caseThrow(new Error('No matches before this'))))
        .to.throw('No matches before this');
    });
  });
});
