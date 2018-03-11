/*
 * Copyright 2017 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { expect } from "chai"
import {
  TypeMatcher, Refined, hasFields, isLiteral,
  isAny, isArrayOf, isBoolean, isFiniteNumber, isMissing, isNever, isNull, isNumber, isObject,
  isString, isUndefined, isTuple1, isTuple2, isTuple3, isTuple4, isTuple5, isTuple6, isTuple7, isTuple8, isTuple9,
  isTuple10, isBoth, isEither, isOptional, isNullable, refined,
  match, caseWhen, caseDefault, failWith, isInstanceOf, isObjectMapOf, MatchCase
} from "../lib"

describe("Matchers", () => {
  describe("isAny", () => {
    it("should match any input", () => {
      expect(isAny(false)).equals(true)
      expect(isAny(NaN)).equals(true)
      expect(isAny(Infinity)).equals(true)
      expect(isAny(10)).equals(true)
      expect(isAny(1.3)).equals(true)
      expect(isAny("string")).equals(true)
      expect(isAny({})).equals(true)
      expect(isAny([])).equals(true)
      expect(isAny(null)).equals(true)
      expect(isAny(undefined)).equals(true)
    })
  })

  describe("isNever", () => {
    it("should never match any input", () => {
      expect(isNever(false)).equals(false)
      expect(isNever(NaN)).equals(false)
      expect(isNever(Infinity)).equals(false)
      expect(isNever(10)).equals(false)
      expect(isNever(1.3)).equals(false)
      expect(isNever("string")).equals(false)
      expect(isNever({})).equals(false)
      expect(isNever([])).equals(false)
      expect(isNever(null)).equals(false)
      expect(isNever(undefined)).equals(false)
    })
  })

  describe("isString", () => {
    it("should match string input", () => {
      expect(isString("aloha")).equals(true)
      expect(isString("aloha2")).equals(true)
    })

    it("should match String object input", () => {
      expect(isString(new String(""))).equals(true)
    })

    it("should not match other types", () => {
      expect(isString(false)).equals(false)
      expect(isString(NaN)).equals(false)
      expect(isString(Infinity)).equals(false)
      expect(isString(10)).equals(false)
      expect(isString(1.3)).equals(false)
      expect(isString({})).equals(false)
      expect(isString([])).equals(false)
      expect(isString(null)).equals(false)
      expect(isString(undefined)).equals(false)
    })
  })

  describe("isNumber", () => {
    it("should match number input", () => {
      expect(isNumber(10)).equals(true)
      expect(isNumber(3.4)).equals(true)
      expect(isNumber(-0.8843)).equals(true)
    })

    it("should match NaN and Infinity", () => {
      expect(isNumber(NaN)).equals(true)
      expect(isNumber(Infinity)).equals(true)
    })

    it("should not match other types", () => {
      expect(isNumber(false)).equals(false)
      expect(isNumber({})).equals(false)
      expect(isNumber(null)).equals(false)
      expect(isNumber("100")).equals(false)
      expect(isNumber(undefined)).equals(false)
    })
  })

  describe("isFiniteNumber", () => {
    it("should match number input", () => {
      expect(isFiniteNumber(10)).equals(true)
      expect(isFiniteNumber(3.4)).equals(true)
      expect(isFiniteNumber(-0.8843)).equals(true)
    })

    it("should not match NaN and Infinity", () => {
      expect(isFiniteNumber(NaN)).equals(false)
      expect(isFiniteNumber(Infinity)).equals(false)
    })

    it("should not match other types", () => {
      expect(isFiniteNumber(false)).equals(false)
      expect(isFiniteNumber({})).equals(false)
      expect(isFiniteNumber(null)).equals(false)
      expect(isFiniteNumber(undefined)).equals(false)
    })
  })

  describe("isBoolean", () => {
    it("should match boolean values", () => {
      expect(isBoolean(true)).equals(true)
      expect(isBoolean(false)).equals(true)
    })

    it("should not match other types", () => {
      expect(isBoolean(NaN)).equals(false)
      expect(isBoolean(Infinity)).equals(false)
      expect(isBoolean(1)).equals(false)
      expect(isBoolean(0)).equals(false)
      expect(isBoolean(1.3)).equals(false)
      expect(isBoolean("true")).equals(false)
      expect(isBoolean({})).equals(false)
      expect(isBoolean([])).equals(false)
      expect(isBoolean(null)).equals(false)
      expect(isBoolean(undefined)).equals(false)
    })
  })

  describe("isObject", () => {
    it("should match any object", () => {
      expect(isObject({})).equals(true)
      expect(isObject([])).equals(true)
      expect(isObject(new String(""))).equals(true)
      expect(isObject(new Number(10))).equals(true)
      expect(isObject(new Boolean(true))).equals(true)
      expect(isObject(() => "")).equals(true)
    })

    it("should not match other types", () => {
      expect(isObject(10)).equals(false)
      expect(isObject(0.2)).equals(false)
      expect(isObject("")).equals(false)
      expect(isObject(false)).equals(false)
      expect(isObject(NaN)).equals(false)
      expect(isObject(Infinity)).equals(false)
      expect(isObject(null)).equals(false)
      expect(isObject(undefined)).equals(false)
    })
  })

  describe("isInstanceOf", () => {
    it("will test instances created with provided constructors", () => {
      class A {
      }

      class B {
      }

      class C extends A {
      }

      const a = new A()
      const b = new B()
      const c = new C()

      expect(isInstanceOf(A)(a)).equals(true, "a is A")
      expect(isInstanceOf(B)(b)).equals(true, "b is B")
      expect(isInstanceOf(A)(b)).equals(false, "b is not A")
      expect(isInstanceOf(B)(a)).equals(false, "a is not B")
      expect(isInstanceOf(C)(c)).equals(true, "c is C")
      expect(isInstanceOf(A)(c)).equals(true, "c is A")
    })
  })

  describe("isArrayOf", () => {
    it("should match empty arrays", () => {
      expect(isArrayOf(isNumber)([])).equals(true)
      expect(isArrayOf(isFiniteNumber)([])).equals(true)
      expect(isArrayOf(isAny)([])).equals(true)
      expect(isArrayOf(isNever)([])).equals(true)
      expect(isArrayOf(isBoolean)([])).equals(true)
      expect(isArrayOf(isString)([])).equals(true)
      expect(isArrayOf(isObject)([])).equals(true)
    })

    it("should match arrays with all values valid", () => {
      expect(isArrayOf(isNumber)([1, 2, 3, 5.6, NaN, Infinity])).equals(true)
      expect(isArrayOf(isString)(["one", "two", "three"])).equals(true)
      expect(isArrayOf(isBoolean)([true, new Boolean(false)])).equals(true)
      expect(isArrayOf(isArrayOf(isFiniteNumber))([[1], [2], [3]])).equals(true)
    })

    it("should not match arrays containing invalid values", () => {
      expect(isArrayOf(isNumber)(["one", "two", 3])).equals(false)
      expect(isArrayOf(isFiniteNumber)([10, NaN, 20])).equals(false)
      expect(isArrayOf(isFiniteNumber)([12, 15, Infinity, 19])).equals(false)
      expect(isArrayOf(isArrayOf(isFiniteNumber))([[1], [2], [1, 2, "three"]])).equals(false)
    })

    it("should not match other types", () => {
      expect(isArrayOf(isAny)(NaN)).equals(false)
      expect(isArrayOf(isAny)(Infinity)).equals(false)
      expect(isArrayOf(isAny)(1)).equals(false)
      expect(isArrayOf(isAny)(0)).equals(false)
      expect(isArrayOf(isAny)(1.3)).equals(false)
      expect(isArrayOf(isAny)("true")).equals(false)
      expect(isArrayOf(isAny)({})).equals(false)
      expect(isArrayOf(isAny)(null)).equals(false)
      expect(isArrayOf(isAny)(undefined)).equals(false)
    })
  })

  describe("isLiteral", () => {
    it("should exactly match values", () => {
      expect(isLiteral(10)(10)).equals(true)
      expect(isLiteral("one")("one")).equals(true)
      expect(isLiteral(true)(true)).equals(true)
      expect(isLiteral(Infinity)(Infinity)).equals(true)
    })
    it("should not match values with different types", () => {
      expect(isLiteral("10")(10)).equals(false)
      expect(isLiteral(0)(false)).equals(false)
      expect(isLiteral(1)(true)).equals(false)
      expect(isLiteral(NaN)(NaN)).equals(false)
    })
    it("should not match different values with same type", () => {
      expect(isLiteral("10")("20")).equals(false)
      expect(isLiteral(1)(1.1)).equals(false)
      expect(isLiteral(true)(false)).equals(false)
    })
  })

  describe("isNull", () => {
    it("should match for null", () => {
      expect(isNull(null)).equals(true)
    })

    it("should not match for values other than null", () => {
      expect(isNull(NaN)).equals(false)
      expect(isNull(Infinity)).equals(false)
      expect(isNull(1)).equals(false)
      expect(isNull(0)).equals(false)
      expect(isNull(1.3)).equals(false)
      expect(isNull("true")).equals(false)
      expect(isNull(false)).equals(false)
      expect(isNull({})).equals(false)
      expect(isNull(undefined)).equals(false)
    })
  })

  describe("isUndefined", () => {
    it("should match for undefined", () => {
      expect(isUndefined(undefined)).equals(true)
    })

    it("should not match for values other than undefined", () => {
      expect(isUndefined(NaN)).equals(false)
      expect(isUndefined(Infinity)).equals(false)
      expect(isUndefined(1)).equals(false)
      expect(isUndefined(0)).equals(false)
      expect(isUndefined(1.3)).equals(false)
      expect(isUndefined("true")).equals(false)
      expect(isUndefined(false)).equals(false)
      expect(isUndefined({})).equals(false)
      expect(isUndefined(null)).equals(false)
    })
  })

  describe("isMissing", () => {
    it("should match for null or undefined", () => {
      expect(isMissing(null)).equals(true)
      expect(isMissing(undefined)).equals(true)
    })

    it("should not match for non null or undefined values", () => {
      expect(isMissing(NaN)).equals(false)
      expect(isMissing(Infinity)).equals(false)
      expect(isMissing(1)).equals(false)
      expect(isMissing(0)).equals(false)
      expect(isMissing(1.3)).equals(false)
      expect(isMissing("true")).equals(false)
      expect(isMissing(false)).equals(false)
      expect(isMissing({})).equals(false)
    })
  })

  describe("hasFields", () => {
    it("should match empty matcher/object", () => {
      expect(hasFields({})({})).equals(true)
    })

    it("should accept extra fields", () => {
      expect(hasFields({})({ one: 1, two: 2 })).equals(true)
    })

    it("should match object with matching fields", () => {
      expect(hasFields({ key: isNumber })({ key: 10 })).equals(true)
      expect(hasFields({ x: refined(isNumber)(_ => _ === 10, "IsTen") })({ x: 10 })).equals(true)
      expect(hasFields({ name: isString })({ x: 10, y: 20, name: "testing" })).equals(true)
      expect(hasFields({
        a: refined(isString)(_ => _ === "one", "IsOne"),
        b: refined(isNumber)(_ => _ === 20, "Is20"),
        c: isNull
      })({
        a: "one",
        b: 20,
        c: null
      })).equals(true)
      expect(hasFields({ length: isNumber })([])).equals(true)
      expect(hasFields({ length: refined(isNumber)(_ => _ === 2, "AnyVal") })([1, 2])).equals(true)
    })

    it("should match missing fields for undefined matcher", () => {
      expect(hasFields({ key: isUndefined })({ value: "aloha" })).equals(true)
      expect(hasFields({ key: isUndefined, value: isUndefined })({})).equals(true)
    })

    it("should not match objects with missing fields", () => {
      expect(hasFields({ key: isNumber })({})).equals(false)
      expect(hasFields({ key: isNumber, value: isString })({ value: "aloha" })).equals(false)
    })

    it("should not match objects with wrong field types", () => {
      expect(hasFields({ key: isNumber })({ key: "10" })).equals(false)
      expect(hasFields({ key: refined(isString)(_ => _ === "20", "20") })({ key: "10" })).equals(false)
      expect(hasFields({ key: isNumber, value: isNumber })({
        key: 10,
        value: "wrong number"
      })).equals(false)
    })

    it("should not match other types", () => {
      const hf = hasFields({})
      expect(hf(NaN)).equals(false)
      expect(hf(Infinity)).equals(false)
      expect(hf(1)).equals(false)
      expect(hf(0)).equals(false)
      expect(hf(1.3)).equals(false)
      expect(hf("true")).equals(false)
      expect(hf(false)).equals(false)
    })
  })

  describe("isObjectMapOf", () => {
    it("should match objects with matching properties", () => {
      expect(isObjectMapOf(isString)({ "one": "one", "two": "two" })).equals(true)
      expect(isObjectMapOf(isString)({ 1: "one", 2: "two" })).equals(true)
      expect(isObjectMapOf(isString)({ 1: "one", "two": "two" })).equals(true)
      expect(isObjectMapOf(isNumber)({ "one": 1, "two": 2 })).equals(true)
      expect(isObjectMapOf(isBoolean)({ "one": true, "two": false })).equals(true)
      expect(isObjectMapOf(isBoolean)({ 1: true, 2: false })).equals(true)

      class Z {
        readonly x: boolean

        constructor(x: boolean) {
          this.x = x
        }
      }

      expect(isObjectMapOf(isBoolean)(new Z(true))).equals(true)
      expect(isObjectMapOf(isNumber)(new Z(true))).equals(false)
    })

    it("should not match if at least one property doesn't match", () => {
      expect(isObjectMapOf(isString)({ "one": "one", "two": 2 })).equals(false)
      expect(isObjectMapOf(isNumber)({ "one": 1, "two": false })).equals(false)
      expect(isObjectMapOf(isBoolean)({ "one": true, "two": "true" })).equals(false)
      expect(isObjectMapOf(isBoolean)({ "one": true, "two": 2 })).equals(false)
      expect(isObjectMapOf(isBoolean)({ "one": true, "two": {} })).equals(false)
      expect(isObjectMapOf(isBoolean)({ "one": true, "two": [] })).equals(false)
    })
  })

  describe("isTuple1", () => {
    const isT1 = isTuple1(isNumber)
    it("should match on valid tuples", () => {
      expect(isT1([10])).equals(true)
      expect(isTuple1(isString)(["test"])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT1([1, 2])).equals(false)
      expect(isT1([])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT1(NaN)).equals(false)
      expect(isT1(Infinity)).equals(false)
      expect(isT1(1)).equals(false)
      expect(isT1(0)).equals(false)
      expect(isT1(1.3)).equals(false)
      expect(isT1("true")).equals(false)
      expect(isT1(false)).equals(false)
      expect(isT1({})).equals(false)
    })
  })

  describe("isTuple2", () => {
    const isT2 = isTuple2(isNumber, isString)
    it("should match on valid tuples", () => {
      expect(isT2([10, "ten"])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT2([1, "one", 2])).equals(false)
      expect(isT2([1])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT2(NaN)).equals(false)
      expect(isT2(Infinity)).equals(false)
      expect(isT2(1)).equals(false)
      expect(isT2(0)).equals(false)
      expect(isT2(1.3)).equals(false)
      expect(isT2("true")).equals(false)
      expect(isT2(false)).equals(false)
      expect(isT2({})).equals(false)
    })
  })

  describe("isTuple3", () => {
    const isT3 = isTuple3(isNumber, isString, isBoolean)
    it("should match on valid tuples", () => {
      expect(isT3([10, "ten", false])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT3([1, "one", true, 2])).equals(false)
      expect(isT3([1, "one"])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT3(NaN)).equals(false)
      expect(isT3(Infinity)).equals(false)
      expect(isT3(1)).equals(false)
      expect(isT3(0)).equals(false)
      expect(isT3(1.3)).equals(false)
      expect(isT3("true")).equals(false)
      expect(isT3(false)).equals(false)
      expect(isT3({})).equals(false)
    })
  })

  describe("isTuple4", () => {
    const isT4 = isTuple4(isNumber, isString, isBoolean, isNumber)
    it("should match on valid tuples", () => {
      expect(isT4([10, "ten", false, 2])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT4([1, "one", true, 2, ""])).equals(false)
      expect(isT4([1, "one", true])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT4(NaN)).equals(false)
      expect(isT4(Infinity)).equals(false)
      expect(isT4(1)).equals(false)
      expect(isT4(0)).equals(false)
      expect(isT4(1.3)).equals(false)
      expect(isT4("true")).equals(false)
      expect(isT4(false)).equals(false)
      expect(isT4({})).equals(false)
    })
  })

  describe("isTuple5", () => {
    const isT5 = isTuple5(isNumber, isString, isBoolean, isNumber, isNumber)
    it("should match on valid tuples", () => {
      expect(isT5([10, "ten", false, 2, 3])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT5([1, "one", true, 2, 3, ""])).equals(false)
      expect(isT5([1, "one", true, 2])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT5(NaN)).equals(false)
      expect(isT5(Infinity)).equals(false)
      expect(isT5(1)).equals(false)
      expect(isT5(0)).equals(false)
      expect(isT5(1.3)).equals(false)
      expect(isT5("true")).equals(false)
      expect(isT5(false)).equals(false)
      expect(isT5({})).equals(false)
    })
  })

  describe("isTuple6", () => {
    const isT6 = isTuple6(isNumber, isString, isBoolean, isNumber, isNumber, isString)
    it("should match on valid tuples", () => {
      expect(isT6([10, "ten", false, 2, 3, "s"])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT6([1, "one", true, 2, 3, "s", ""])).equals(false)
      expect(isT6([1, "one", true, 2, 3])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT6(NaN)).equals(false)
      expect(isT6(Infinity)).equals(false)
      expect(isT6(1)).equals(false)
      expect(isT6(0)).equals(false)
      expect(isT6(1.3)).equals(false)
      expect(isT6("true")).equals(false)
      expect(isT6(false)).equals(false)
      expect(isT6({})).equals(false)
    })
  })

  describe("isTuple7", () => {
    const isT7 = isTuple7(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull)

    it("should match on valid tuples", () => {
      expect(isT7([10, "ten", false, 2, 3, "s", null])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT7([1, "one", true, 2, 3, "s", null, ""])).equals(false)
      expect(isT7([1, "one", true, 2, 3, "s"])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT7(NaN)).equals(false)
      expect(isT7(Infinity)).equals(false)
      expect(isT7(1)).equals(false)
      expect(isT7(0)).equals(false)
      expect(isT7(1.3)).equals(false)
      expect(isT7("true")).equals(false)
      expect(isT7(false)).equals(false)
      expect(isT7({})).equals(false)
    })
  })

  describe("isTuple8", () => {
    const isT8 = isTuple8(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull, isBoolean)

    it("should match on valid tuples", () => {
      expect(isT8([10, "ten", false, 2, 3, "s", null, true])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT8([1, "one", true, 2, 3, "s", null, true, ""])).equals(false)
      expect(isT8([1, "one", true, 2, 3, "s", null])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT8(NaN)).equals(false)
      expect(isT8(Infinity)).equals(false)
      expect(isT8(1)).equals(false)
      expect(isT8(0)).equals(false)
      expect(isT8(1.3)).equals(false)
      expect(isT8("true")).equals(false)
      expect(isT8(false)).equals(false)
      expect(isT8({})).equals(false)
    })
  })

  describe("isTuple9", () => {
    const isT9 = isTuple9(isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull, isBoolean, isString)

    it("should match on valid tuples", () => {
      expect(isT9([10, "ten", false, 2, 3, "s", null, true, "9"])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT9([1, "one", true, 2, 3, "s", null, true, "9", ""])).equals(false)
      expect(isT9([1, "one", true, 2, 3, "s", null, true])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT9(NaN)).equals(false)
      expect(isT9(Infinity)).equals(false)
      expect(isT9(1)).equals(false)
      expect(isT9(0)).equals(false)
      expect(isT9(1.3)).equals(false)
      expect(isT9("true")).equals(false)
      expect(isT9(false)).equals(false)
      expect(isT9({})).equals(false)
    })
  })

  describe("isTuple10", () => {
    const isT10 = isTuple10(
      isNumber, isString, isBoolean, isNumber, isNumber, isString, isNull,
      isBoolean, isString, refined(isNumber)(_ => _ === 3, "3")
    )

    it("should match on valid tuples", () => {
      expect(isT10([10, "ten", false, 2, 3, "s", null, true, "9", 3])).equals(true)
    })

    it("should not match different size tuples", () => {
      expect(isT10([1, "one", true, 2, 3, "s", null, true, "9", 3, ""])).equals(false)
      expect(isT10([1, "one", true, 2, 3, "s", null, true, "9"])).equals(false)
    })

    it("should not match other types", () => {
      expect(isT10(NaN)).equals(false)
      expect(isT10(Infinity)).equals(false)
      expect(isT10(1)).equals(false)
      expect(isT10(0)).equals(false)
      expect(isT10(1.3)).equals(false)
      expect(isT10("true")).equals(false)
      expect(isT10(false)).equals(false)
      expect(isT10({})).equals(false)
    })
  })

  describe("isBoth", () => {
    it("should match when both matches", () => {
      expect(isBoth(isNumber, refined(isNumber)(_ => _ === 10, "10"))(10)).equals(true)
      expect(isBoth(
        hasFields({ key: isString }),
        hasFields({ value: refined(isNumber)(_ => _ === 10, "10") })
      )({
        key: "key",
        value: 10
      })).equals(true)
    })

    it("should not match when one does't match", () => {
      expect(isBoth(isNumber, refined(isNumber)(_ => _ === 20, "20"))(30)).equals(false)
      expect(isBoth(isString, isNumber)(10)).equals(false)
    })
  })

  describe("isEither", () => {
    it("should match when one matches", () => {
      expect(isEither(isNumber, refined(isNumber)(_ => _ === 20, "20"))(10)).equals(true)
      expect(isEither(isNumber, isString)(10)).equals(true)
      expect(isEither(isNumber, isString)("str")).equals(true)
    })

    it("should not match when none match", () => {
      expect(isBoth(isNumber, refined(isNumber)(_ => _ === 20, "20"))("str")).equals(false)
      expect(isBoth(isString, refined(isNumber)(_ => _ === 30, "30"))(10)).equals(false)
    })
  })

  describe("isOptional", () => {
    it("should match for valid value or undefined", () => {
      expect(isOptional(isNumber)(10)).equals(true)
      expect(isOptional(isString)(undefined)).equals(true)
      expect(isOptional(isNever)(undefined)).equals(true)
    })

    it("should not match for other types", () => {
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(NaN)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(Infinity)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(1)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(0)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(1.3)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))("true")).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(false)).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))({})).equals(false)
      expect(isOptional(refined(isNumber)(_ => _ === -1, "-1"))(null)).equals(false)
    })
  })

  describe("isNullable", () => {
    it("should match for valid value or null", () => {
      expect(isNullable(isNumber)(10)).equals(true)
      expect(isNullable(isString)(null)).equals(true)
      expect(isNullable(isNever)(null)).equals(true)
    })

    it("should not match for other types", () => {
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(NaN)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(Infinity)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(1)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(0)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(1.3)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))("true")).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(false)).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))({})).equals(false)
      expect(isNullable(refined(isNumber)(_ => _ === -1, "-1"))(undefined)).equals(false)
    })
  })

  describe("refined", () => {
    it("should return a TypeMatcher for a refined type", () => {
      const match: TypeMatcher<Refined<number, "Positive">> = refined(isNumber)(_ => _ > 0, "Positive")
      expect(match(1)).equals(true, "1 is positive")
      // You may be wondering is 0 positive or not?! Answer: it depends ... it doesn't matter for this test
      expect(match(0)).equals(false, "0 is not positive (?)")
      expect(match(-1)).equals(false, "-1 is not positive")
    })

    it("works with isBoth", () => {
      const isGreaterThan10: TypeMatcher<Refined<number, "GreaterThan10">> = refined(isNumber)(_ => _ > 10, "GreaterThan10")
      const isLowerThan20: TypeMatcher<Refined<number, "LowerThan20">> = refined(isNumber)(_ => _ < 20, "LowerThan20")

      // some type tests, by compiler
      const inRange: TypeMatcher<Refined<number, "GreaterThan10" & "LowerThan20">> = isBoth(isGreaterThan10, isLowerThan20)
      const a: TypeMatcher<number> = isGreaterThan10
      const b: TypeMatcher<Refined<number, "GreaterThan10">> = inRange
      const c: TypeMatcher<Refined<number, "LowerThan20">> = inRange

      expect(isGreaterThan10(11)).equals(true)
      expect(isGreaterThan10(10)).equals(false)
      expect(isLowerThan20(19)).equals(true)
      expect(isLowerThan20(20)).equals(false)

      expect(inRange(10)).equals(false)
      expect(inRange(11)).equals(true)
      expect(inRange(19)).equals(true)
      expect(inRange(20)).equals(false)
    })

    it("works with isEither", () => {
      const isGreaterThan20: TypeMatcher<Refined<number, "GreaterThan20">> = refined(isNumber)(_ => _ > 20, "GreaterThan20")
      const isLowerThan10: TypeMatcher<Refined<number, "LowerThan10">> = refined(isNumber)(_ => _ < 10, "LowerThan10")

      // some type tests, by compiler
      const inRange: TypeMatcher<Refined<number, "GreaterThan20"> | Refined<number, "LowerThan10">> = isEither(isGreaterThan20, isLowerThan10)
      const inRange2: TypeMatcher<Refined<number, "GreaterThan20" | "LowerThan10">> = isEither(isGreaterThan20, isLowerThan10)

      const a: TypeMatcher<number> = isGreaterThan20

      expect(isGreaterThan20(21)).equals(true)
      expect(isGreaterThan20(20)).equals(false)
      expect(isLowerThan10(9)).equals(true)
      expect(isLowerThan10(10)).equals(false)

      expect(inRange(10)).equals(false)
      expect(inRange(20)).equals(false)
      expect(inRange(9)).equals(true)
      expect(inRange(21)).equals(true)
    })
  })

  describe("failWith", () => {
    it("will return true on match", () => {
      expect(failWith(new Error("Invalid value, string expected"))(isString)("aloha"))
        .equals(true, "new matcher returns true")
    })

    it("will throw on matcher miss", () => {
      expect(() => failWith(new Error("Invalid value, string expected"))(isString)(10))
        .to.throw("Invalid value, string expected")
    })
  })
})

describe("Match DSL", function () {
  describe("match", () => {
    it("calls Case.map function over input value and returns result", () => {
      expect(match(10,
        caseWhen(isAny, ten => {
          expect(ten).equals(10)
          return "executed"
        })
      )).equals("executed")
    })
  })

  describe("caseWhen", () => {
    it("builds new match case", () => {
      const isOne: TypeMatcher<"one"> = (val: any): val is "one" => val === "one"
      const c: MatchCase<"one", 1> = caseWhen(isOne, (one): 1 => 1)
      expect(c.map("one")).equals(1)
    })

    it("will throw on error when input doesn't match (may be caused by buggy type matchers", () => {
      const isTen: TypeMatcher<10> = (val: any): val is 10 => false
      expect(() => caseWhen(isTen, _ => _ * 2).map(10)).throws("No match")
    })

    it("should exhaustive check input value type", () => {
      // Unfortunately there is no way (know to me) to check compilation failures :(
      const x: number = match("1" as string | number,
        caseWhen(isString, _ => 10).
        caseWhen(isNumber, _ => _)
      )
    })

    it("should compose result types", () => {
      const cases = caseWhen(isBoolean, (_): 0 => 0)
        .caseWhen(isString, (_): 1 => 1)
        .caseWhen(isNumber, (_): 2 => 2)

      const x1: 0 | 1 | 2 = cases.map(true)
      expect(x1).equals(0)

      const x2: 0 | 1 | 2 = cases.map("hello")
      expect(x2).equals(1)

      const x3: 0 | 1 | 2 = cases.map(10)
      expect(x3).equals(2)

      const y1: 0 | 1 | 2 | 3 = caseWhen(isBoolean, _ => _ ? 1 : 0) // result type inferred as 1 | 0
        .caseWhen(isString, _ => _.length > 0 ? 2 : 1) // result type inferred as 2 | 1
        .caseWhen(isNumber, (_): 3 => 3)
        .map("hello")
    })

    it("should check cases in order those was defined", () => {
      let cnt = 0
      const cases = caseWhen(
        (val: any): val is boolean => {
          expect(cnt).equals(0)
          cnt += 1
          return isBoolean(val)
          },
          () => cnt
        ).
        caseWhen(
          (val: any): val is string => {
            expect(cnt).equals(1)
            cnt += 1
            return isString(val)
          },
          () => cnt
        ).
        caseWhen(
          (val: any): val is number => {
            expect(cnt).equals(2)
            cnt += 1
            return isNumber(val)
          },
          () => cnt
        ).
        caseWhen(
          (val: any): val is number => {
            expect(cnt).equals(3)
            cnt += 1
            return isFiniteNumber(val)
          },
          () => cnt
        ).
        caseWhen(
          (val: any): val is object => {
            expect(cnt).equals(4)
            cnt += 1
            return isObject(val)
          },
          () => cnt
        )

      expect(cases.map({})).equals(5)
    })
  })

  describe("caseDefault", () => {
    it("returns function result for any given input", () => {
      expect(caseDefault(() => 10).map("hello1")).equals(10)
      expect(caseDefault(() => "hola").map("hello2")).equals("hola")
      expect(caseDefault(() => true).map("hello3")).equals(true)
      expect(caseDefault(() => false).map("hello4")).equals(false)
    })
  })
})
