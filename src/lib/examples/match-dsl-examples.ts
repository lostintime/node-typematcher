/*
 * Copyright 2018 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  match, caseWhen, caseDefault, hasFields, isString, isNumber, isOptional, TypeMatcher,
  isEither, isNull, isValue, MatchCase, isBoolean
} from "../"

// const id: <A>(val: A) => A = val => val

// type InputT = "one" | "two"

// const isOne = (val: any): val is "one" => val === "one"
// const isTwo = (val: any): val is "two" => val === "two"
// const isThree = (val: any): val is "three" => val === "three"

// const input = "one"

// const r1: number = match(
//   input,
//   caseWhen(isOne, _ => 1).
//   caseWhen(isTwo, _ => 2).
//   caseWhen(isThree, _ => 3)
// )

// type N3 = 1 | 2 | 3
// const r3: N3 =
//   caseWhen(isOne, (): N3 => 1).
//   caseWhen(isTwo, () => 2).
//   caseWhen(isThree, () => 3).
//   map("two")

// const r4: "one" = match("one", caseDefault<"one">(() => "one"))
// const r5: "one" = match("one", caseDefault<"one">(() => "one"))

// type OneTwoThree = "one" | "two" | "three"
// const r6: OneTwoThree = match("one",
//   caseWhen(isOne, (_): OneTwoThree => _).
//   caseWhen(isTwo, id).
//   caseWhen(isThree, id)
// )

// // ==================================================================

// type O1 = "one"
// type O2 = "two"
// type O3 = "three"

// const isO1 = (val: any): val is O1 => val === "one"
// const isO2 = (val: any): val is O2 => val === "two"
// const isO3 = (val: any): val is O3 => val === "three"

// type O1Or2 = O1 | O2
// type O1Or2Or3 = O1Or2 | O3

// const isO1Or2 = (val: any): val is O1Or2 => isO1(val) || isO2(val)
// const isO1Or2Or3 = (val: any): val is O1Or2Or3 => isO1Or2(val) || isO3(val)

// type ValT = O2
// type CasesT = O2
// type ReturnT = 1

// const val1: O1 = "one"
// const val2: O2 = "two"
// const val1Or2: O1Or2 = "one" as any
// const val3: O3 = "three"

// const handle = <T>(val: T): ReturnT => 1
// const neverHandle = (): ReturnT => {
//   throw new Error("never handler!")
// }

// // works: cases O1 covered by typa matcher isO1, isO2 and isO3
// const c1a: MatchCase<O1, ReturnT> = caseWhen(isO1, handle)
// const c1aa: MatchCase<O1, ReturnT> = caseWhen(isO1Or2, handle)
// const c1aaa: MatchCase<O1, ReturnT> = caseWhen(isO1Or2Or3, handle)

// const c1b: MatchCase<O2, ReturnT> = caseWhen(isO2, handle)
// const c1bb: MatchCase<O2, ReturnT> = caseWhen(isO1Or2, handle)
// const c1bbb: MatchCase<O3, ReturnT> = caseWhen(isO1Or2Or3, handle)

// const c1c: MatchCase<O3, ReturnT> = caseWhen(isO3, handle)
// const c1ab: MatchCase<O1Or2, ReturnT> = caseWhen(isO1Or2, handle)
// const c1abb: MatchCase<O1Or2, ReturnT> = caseWhen(isO1Or2Or3, handle)

// // succeeds
// const c3a: ReturnT = caseWhen(isO1, handle).map(val1)
// const c3b: ReturnT = caseWhen(isO1Or2, handle).map(val2)
// const c3c: ReturnT = caseWhen(isO1Or2Or3, handle).map(val3)

// const c1abc: MatchCase<O1Or2Or3, ReturnT> =
//   caseWhen(isO1, handle).
//   caseWhen(isO2, handle). // fails if any of these commented
//   caseWhen(isO3, handle)

// const c1or2: MatchCase<O1Or2, ReturnT> = caseWhen(isO1, handle).caseDefault(() => 1)

// // fails, val2 have more values
// const c4: ReturnT = caseWhen(isO1, handle).map(val2)
// const c44: ReturnT = caseWhen(isO2, handle).map(val1Or2)
// // fails, val2 have more values
// const c5: ReturnT = caseWhen(isO1, handle).map(val3)

// const anyVal: any = null as any
// // should fail! but it's not!!! - `any` type is bivariant
// const cc1: ReturnT = match(anyVal, caseWhen(isO1Or2, handle))
