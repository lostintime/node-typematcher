/*
 * Copyright 2017 by TypeMatcher developers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { match, caseWhen, caseDefault, caseId } from "../"

type InputT = "one" | "two"

const isOne = (val: any): val is "one" => val === "one"
const isTwo = (val: any): val is "two" => val === "two"
const isThree = (val: any): val is "three" => val === "three"

const input = "one"

const r1: number = match(
  input,
  caseWhen(isOne, _ => 1).
  caseWhen(isTwo, _ => 2).
  caseWhen(isThree, _ => 3)
)

type N3 = 1 | 2 | 3
const r3: N3 =
  caseWhen(isOne, (): N3 => 1).
  caseWhen(isTwo, () => 2).
  caseWhen(isThree, () => 3).
  map("two")

const r4: "one" = match("one", caseDefault<"one">(() => "one"))
const r5: "one" = match("one", caseDefault<"one">(() => "one"))

type OneTwoThree = "one" | "two" | "three"
const r6: OneTwoThree = match("one",
  caseId<OneTwoThree>(isOne).
  caseId(isTwo).
  caseId(isThree)
)
